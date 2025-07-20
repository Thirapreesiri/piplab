import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeftRight, 
  ArrowRightLeft, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  BarChart,
  LineChart,
  AlertTriangle,
  Check,
  Download,
  XCircle,
  ChevronRight,
  Plus,
  Trash2
} from 'lucide-react';
import { toast } from "sonner";
import { createEAFile } from '@/utils/eaGenerator';
import { EAConfig, Condition } from '@/types/ea';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Builder = () => {
  // Available condition components
  const availableConditions = [
    { id: 'ma', type: 'entry', name: 'Moving Average Cross', icon: TrendingUp },
    { id: 'rsi', type: 'entry', name: 'RSI Overbought/Oversold', icon: LineChart },
    { id: 'macd', type: 'entry', name: 'MACD Signal', icon: LineChart },
    { id: 'bollinger', type: 'entry', name: 'Bollinger Bands', icon: LineChart },
    { id: 'support-resistance', type: 'entry', name: 'Support/Resistance', icon: TrendingDown },
    { id: 'time', type: 'exit', name: 'Exit after Time', icon: Clock },
    { id: 'profit-target', type: 'exit', name: 'Profit Target', icon: TrendingUp },
    { id: 'trailing-stop', type: 'exit', name: 'Trailing Stop', icon: TrendingDown },
  ];

  // State for the EA configuration
  const [eaConfig, setEaConfig] = useState<EAConfig>({
    entryConditions: [],
    exitConditions: [],
    riskManagement: {
      stopLoss: 50,
      takeProfit: 100,
      trailingStop: false,
      lotSize: 0.1,
    }
  });

  const [activeTab, setActiveTab] = useState('entry');
  const [showSummary, setShowSummary] = useState(false);
  const [eaName, setEaName] = useState("CustomEA");
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  
  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, condition: any) => {
    e.dataTransfer.setData('condition', JSON.stringify(condition));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.add('border-brand-blue', 'bg-brand-blue/5');
    }
  };

  const handleDragLeave = () => {
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.remove('border-brand-blue', 'bg-brand-blue/5');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.remove('border-brand-blue', 'bg-brand-blue/5');
    }
    
    try {
      const conditionData = JSON.parse(e.dataTransfer.getData('condition'));
      
      // Generate default parameters based on condition type
      let parameters = {};
      
      switch (conditionData.id) {
        case 'ma-cross':
          parameters = { fastPeriod: 9, slowPeriod: 21, direction: 'bullish' };
          break;
        case 'rsi':
          parameters = { period: 14, overbought: 70, oversold: 30 };
          break;
        case 'macd':
          parameters = { fastEMA: 12, slowEMA: 26, signalPeriod: 9 };
          break;
        case 'bollinger':
          parameters = { period: 20, deviations: 2, action: 'breakout' };
          break;
        case 'support-resistance':
          parameters = { supportLevel: 1.2000, resistanceLevel: 1.3000, action: 'bounce_support' };
          break;
        case 'time':
          parameters = { minutes: 60 };
          break;
        case 'profit-target':
          parameters = { pips: 50 };
          break;
        case 'trailing-stop':
          parameters = { pips: 20, activation: 30 };
          break;
        default:
          parameters = {};
      }
      
      const newCondition: Condition = {
        id: `${conditionData.id}-${Date.now()}`,
        type: conditionData.type,
        name: conditionData.name,
        parameters
      };
      
      if (conditionData.type === 'entry') {
        setEaConfig(prev => ({
          ...prev,
          entryConditions: [...prev.entryConditions, newCondition]
        }));
      } else if (conditionData.type === 'exit') {
        setEaConfig(prev => ({
          ...prev,
          exitConditions: [...prev.exitConditions, newCondition]
        }));
      }
      
      toast.success(`เพิ่ม ${conditionData.name} สำเร็จ`);
    } catch (error) {
      console.error("Error adding condition:", error);
      toast.error("เกิดข้อผิดพลาดในการเพิ่มเงื่อนไข");
    }
  };

  // Remove a condition
  const removeCondition = (id: string, type: 'entry' | 'exit') => {
    if (type === 'entry') {
      setEaConfig(prev => ({
        ...prev,
        entryConditions: prev.entryConditions.filter(c => c.id !== id)
      }));
    } else {
      setEaConfig(prev => ({
        ...prev,
        exitConditions: prev.exitConditions.filter(c => c.id !== id)
      }));
    }
    toast.success("ลบเงื่อนไขสำเร็จ");
  };

  // Update risk management settings
  const updateRiskManagement = (key: string, value: any) => {
    setEaConfig(prev => ({
      ...prev,
      riskManagement: {
        ...prev.riskManagement,
        [key]: value
      }
    }));
  };

  // Update condition parameters
  const updateConditionParam = (conditionId: string, type: 'entry' | 'exit', paramKey: string, value: any) => {
    const conditions = type === 'entry' ? 'entryConditions' : 'exitConditions';
    
    setEaConfig(prev => ({
      ...prev,
      [conditions]: prev[conditions].map((c: Condition) => {
        if (c.id === conditionId) {
          return {
            ...c,
            parameters: {
              ...c.parameters,
              [paramKey]: value
            }
          };
        }
        return c;
      })
    }));
  };

  // Generate EA summary
  const handleGenerateSummary = () => {
    if (eaConfig.entryConditions.length === 0) {
      toast.error("กรุณาเพิ่มเงื่อนไขการเข้าตลาดอย่างน้อย 1 เงื่อนไข");
      return;
    }
    
    setShowSummary(true);
  };

  // Handle download (show payment modal)
  // Handle download
  const handleDownload = () => {
    try {
      // Create EA file for download
      const eaFile = createEAFile(eaConfig, eaName);
      
      // Create a download link and trigger it
      const downloadLink = document.createElement('a');
      const url = URL.createObjectURL(eaFile);
      
      downloadLink.href = url;
      downloadLink.download = `${eaName}.mq4`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
      }, 100);
      
      toast.success("ดาวน์โหลดไฟล์ EA สำเร็จ");
    } catch (error) {
      console.error("Error generating EA file:", error);
      toast.error("เกิดข้อผิดพลาดในการสร้างไฟล์ EA");
    }
  };

  // Mock payment process with actual EA file generation
  const handlePayment = () => {
    setPaymentProcessing(true);
    
    toast.success("กำลังประมวลผลการชำระเงิน...");
    
    // Simulate payment processing delay
    setTimeout(() => {
      try {
        // Create EA file for download
        const eaFile = createEAFile(eaConfig, eaName);
        
        // Create a download link and trigger it
        const downloadLink = document.createElement('a');
        const url = URL.createObjectURL(eaFile);
        
        downloadLink.href = url;
        downloadLink.download = `${eaName}.mq4`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        
        // Clean up
        setTimeout(() => {
          document.body.removeChild(downloadLink);
          URL.revokeObjectURL(url);
        }, 100);
        
        toast.success("ชำระเงินสำเร็จ! กำลังดาวน์โหลดไฟล์ EA");
        setPaymentModalOpen(false);
        setPaymentProcessing(false);
      } catch (error) {
        console.error("Error generating EA file:", error);
        toast.error("เกิดข้อผิดพลาดในการสร้างไฟล์ EA");
        setPaymentProcessing(false);
      }
    }, 2000);
  };

  // Render parameter inputs based on condition type
  const renderParameterInputs = (condition: Condition) => {
    switch (condition.id.split('-')[0]) {
      case 'ma':
        return (
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fast Period</label>
                <input
                  type="number"
                  value={condition.parameters.fastPeriod}
                  onChange={(e) => updateConditionParam(condition.id, condition.type as 'entry' | 'exit', 'fastPeriod', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slow Period</label>
                <input
                  type="number"
                  value={condition.parameters.slowPeriod}
                  onChange={(e) => updateConditionParam(condition.id, condition.type as 'entry' | 'exit', 'slowPeriod', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Direction</label>
              <select
                value={condition.parameters.direction}
                onChange={(e) => updateConditionParam(condition.id, condition.type as 'entry' | 'exit', 'direction', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
              >
                <option value="bullish">Bullish (Fast crosses above Slow)</option>
                <option value="bearish">Bearish (Fast crosses below Slow)</option>
              </select>
            </div>
          </div>
        );
      
      case 'rsi':
        return (
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
              <input
                type="number"
                value={condition.parameters.period}
                onChange={(e) => updateConditionParam(condition.id, condition.type as 'entry' | 'exit', 'period', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Overbought Level</label>
                <input
                  type="number"
                  value={condition.parameters.overbought}
                  onChange={(e) => updateConditionParam(condition.id, condition.type as 'entry' | 'exit', 'overbought', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Oversold Level</label>
                <input
                  type="number"
                  value={condition.parameters.oversold}
                  onChange={(e) => updateConditionParam(condition.id, condition.type as 'entry' | 'exit', 'oversold', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>
            </div>
          </div>
        );

      case 'macd':
      case 'bollinger':
      case 'time':
        return (
          <div className="space-y-4 mt-4">
            <p className="text-sm text-gray-600">กรุณาตั้งค่าพารามิเตอร์สำหรับเงื่อนไขนี้</p>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(condition.parameters).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  {typeof value === 'boolean' ? (
                    <select
                      value={value ? 'true' : 'false'}
                      onChange={(e) => updateConditionParam(
                        condition.id, 
                        condition.type as 'entry' | 'exit', 
                        key, 
                        e.target.value === 'true'
                      )}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  ) : typeof value === 'string' ? (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => updateConditionParam(condition.id, condition.type as 'entry' | 'exit', key, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  ) : (
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => updateConditionParam(
                        condition.id, 
                        condition.type as 'entry' | 'exit', 
                        key, 
                        parseInt(e.target.value)
                      )}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'support-resistance':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ระดับแนวรับ
              </label>
              <input
                type="number"
                step="0.0001"
                value={condition.parameters.supportLevel}
                onChange={(e) => updateConditionParam(condition.id, condition.type as 'entry' | 'exit', 'supportLevel', parseFloat(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue sm:text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ระดับแนวต้าน
              </label>
              <input
                type="number"
                step="0.0001"
                value={condition.parameters.resistanceLevel}
                onChange={(e) => updateConditionParam(condition.id, condition.type as 'entry' | 'exit', 'resistanceLevel', parseFloat(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue sm:text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                การกระทำ
              </label>
              <select
                value={condition.parameters.action}
                onChange={(e) => updateConditionParam(condition.id, condition.type as 'entry' | 'exit', 'action', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue sm:text-sm"
              >
                <option value="bounce_support">สะท้อนจากแนวรับ (ซื้อ)</option>
                <option value="bounce_resistance">สะท้อนจากแนวต้าน (ขาย)</option>
                <option value="break_support">ทะลุแนวรับ (ขาย)</option>
                <option value="break_resistance">ทะลุแนวต้าน (ซื้อ)</option>
              </select>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="mt-4">
            <p className="text-sm text-gray-600">กรุณาปรับแต่งพารามิเตอร์สำหรับเงื่อนไขนี้</p>
            {Object.entries(condition.parameters).map(([key, value]) => (
              <div key={key} className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type={typeof value === 'number' ? 'number' : 'text'}
                  value={value}
                  onChange={(e) => updateConditionParam(
                    condition.id, 
                    condition.type as 'entry' | 'exit', 
                    key, 
                    typeof value === 'number' ? parseInt(e.target.value) : e.target.value
                  )}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>
            ))}
          </div>
        );
    }
  };

  // Render the condition card
  const renderConditionCard = (condition: Condition, index: number) => {
    const IconComponent = availableConditions.find(c => c.id === condition.id.split('-')[0])?.icon || ArrowRightLeft;
    
    return (
      <Card key={condition.id} className="mb-4 border border-gray-200 hover:shadow-md transition-shadow">
        <CardContent className="pt-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div className="p-2 bg-brand-blue/10 rounded-md mr-3">
                <IconComponent className="h-5 w-5 text-brand-blue" />
              </div>
              <div>
                <h3 className="font-medium">{condition.name}</h3>
                <p className="text-sm text-gray-500">เงื่อนไขที่ {index + 1}</p>
              </div>
            </div>
            <button 
              onClick={() => removeCondition(condition.id, condition.type as 'entry' | 'exit')} 
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          
          {renderParameterInputs(condition)}
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Title section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">สร้าง Expert Advisor แบบลากวาง</h1>
            <p className="text-gray-600 mt-2">เลือกเงื่อนไขที่คุณต้องการและปรับแต่งพารามิเตอร์ได้อย่างอิสระ</p>
          </div>

          {showSummary ? (
            <div className="max-w-4xl mx-auto">
              <Button 
                variant="outline" 
                className="mb-6" 
                onClick={() => setShowSummary(false)}
              >
                <ChevronRight className="h-4 w-4 mr-2 rotate-180" />
                กลับไปแก้ไข
              </Button>
              
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-6">สรุป Expert Advisor</h2>
                  
                  <div className="space-y-6">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ EA</label>
                      <input
                        type="text"
                        value={eaName}
                        onChange={(e) => setEaName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        placeholder="ตั้งชื่อ EA ของคุณ"
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium flex items-center mb-4">
                        <TrendingUp className="h-5 w-5 mr-2 text-brand-blue" />
                        เงื่อนไขการเข้าตลาด
                      </h3>
                      <div className="rounded-md bg-gray-50 p-4 border border-gray-200">
                        {eaConfig.entryConditions.map((condition, index) => (
                          <div key={condition.id} className={`${index > 0 ? 'mt-4 pt-4 border-t border-gray-200' : ''}`}>
                            <div className="flex items-center mb-2">
                              <div className="w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center text-white text-sm mr-2">
                                {index + 1}
                              </div>
                              <h4 className="font-medium">{condition.name}</h4>
                            </div>
                            <div className="pl-8">
                              <ul className="list-disc pl-5 text-sm text-gray-600">
                                {Object.entries(condition.parameters).map(([key, value]) => (
                                  <li key={key}>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}: <span className="font-medium">{value}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium flex items-center mb-4">
                        <TrendingDown className="h-5 w-5 mr-2 text-brand-blue" />
                        เงื่อนไขการออกตลาด
                      </h3>
                      <div className="rounded-md bg-gray-50 p-4 border border-gray-200">
                        {eaConfig.exitConditions.length > 0 ? (
                          eaConfig.exitConditions.map((condition, index) => (
                            <div key={condition.id} className={`${index > 0 ? 'mt-4 pt-4 border-t border-gray-200' : ''}`}>
                              <div className="flex items-center mb-2">
                                <div className="w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center text-white text-sm mr-2">
                                  {index + 1}
                                </div>
                                <h4 className="font-medium">{condition.name}</h4>
                              </div>
                              <div className="pl-8">
                                <ul className="list-disc pl-5 text-sm text-gray-600">
                                  {Object.entries(condition.parameters).map(([key, value]) => (
                                    <li key={key}>
                                      {key.charAt(0).toUpperCase() + key.slice(1)}: <span className="font-medium">{value}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500">ไม่มีเงื่อนไขการออกตลาดเพิ่มเติม (จะใช้ Stop Loss และ Take Profit เป็นหลัก)</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium flex items-center mb-4">
                        <AlertTriangle className="h-5 w-5 mr-2 text-brand-blue" />
                        การจัดการความเสี่ยง
                      </h3>
                      <div className="rounded-md bg-gray-50 p-4 border border-gray-200">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Stop Loss:</p>
                            <p className="font-medium">{eaConfig.riskManagement.stopLoss} pips</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Take Profit:</p>
                            <p className="font-medium">{eaConfig.riskManagement.takeProfit} pips</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Trailing Stop:</p>
                            <p className="font-medium">{eaConfig.riskManagement.trailingStop ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Lot Size:</p>
                            <p className="font-medium">{eaConfig.riskManagement.lotSize}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-center">
                    <Button 
                      onClick={handleDownload} 
                      className="bg-brand-blue hover:bg-brand-blue/90 text-white"
                      size="lg"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      ดาวน์โหลด EA
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Available conditions panel */}
              <div>
                <h2 className="text-xl font-medium mb-4">เงื่อนไขที่ใช้ได้</h2>
                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-sm text-gray-600 mb-4">ลากเงื่อนไขที่คุณต้องการไปวางในพื้นที่</p>
                  
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="w-full mb-4">
                      <TabsTrigger value="entry" className="flex-1">เงื่อนไขการเข้า</TabsTrigger>
                      <TabsTrigger value="exit" className="flex-1">เงื่อนไขการออก</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="entry">
                      <div className="space-y-3">
                        {availableConditions.filter(c => c.type === 'entry').map((condition) => (
                          <div
                            key={condition.id}
                            className="drag-item bg-gray-50 border border-gray-200 p-3 rounded-md flex items-center hover:bg-gray-100 hover:border-gray-300 transition-colors"
                            draggable
                            onDragStart={(e) => handleDragStart(e, condition)}
                          >
                            <condition.icon className="h-5 w-5 text-brand-blue mr-3" />
                            <span className="text-sm">{condition.name}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="exit">
                      <div className="space-y-3">
                        {availableConditions.filter(c => c.type === 'exit').map((condition) => (
                          <div
                            key={condition.id}
                            className="drag-item bg-gray-50 border border-gray-200 p-3 rounded-md flex items-center hover:bg-gray-100 hover:border-gray-300 transition-colors"
                            draggable
                            onDragStart={(e) => handleDragStart(e, condition)}
                          >
                            <condition.icon className="h-5 w-5 text-brand-blue mr-3" />
                            <span className="text-sm">{condition.name}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
              
              {/* EA Builder panel */}
              <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-medium">EA Builder</h2>
                  <Button 
                    onClick={handleGenerateSummary}
                    disabled={eaConfig.entryConditions.length === 0}
                    className="bg-brand-blue hover:bg-brand-blue/90 text-white"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    สร้าง EA
                  </Button>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <div 
                    ref={dropAreaRef}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className="mb-6 min-h-40 border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 transition-colors"
                  >
                    <p className="text-gray-500 mb-2">ลากและวางเงื่อนไขที่ต้องการที่นี่</p>
                    <Plus className="h-6 w-6 text-gray-400" />
                  </div>
                  
                  <Tabs defaultValue="entry">
                    <TabsList className="w-full mb-4">
                      <TabsTrigger value="entry" className="flex-1">เงื่อนไขการเข้าตลาด</TabsTrigger>
                      <TabsTrigger value="exit" className="flex-1">เงื่อนไขการออกตลาด</TabsTrigger>
                      <TabsTrigger value="risk" className="flex-1">จัดการความเสี่ยง</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="entry">
                      {eaConfig.entryConditions.length > 0 ? (
                        <div className="space-y-4">
                          {eaConfig.entryConditions.map((condition, index) => 
                            renderConditionCard(condition, index)
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <TrendingUp className="mx-auto h-10 w-10 mb-4 text-gray-400" />
                          <p>ยังไม่มีเงื่อนไขการเข้าตลาด</p>
                          <p className="text-sm mt-2">ลากเงื่อนไขจากรายการด้านซ้ายมาวาง</p>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="exit">
                      {eaConfig.exitConditions.length > 0 ? (
                        <div className="space-y-4">
                          {eaConfig.exitConditions.map((condition, index) => 
                            renderConditionCard(condition, index)
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <TrendingDown className="mx-auto h-10 w-10 mb-4 text-gray-400" />
                          <p>ยังไม่มีเงื่อนไขการออกตลาด</p>
                          <p className="text-sm mt-2">ลากเงื่อนไขจากรายการด้านซ้ายมาวาง</p>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="risk">
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Stop Loss (pips)</label>
                          <input
                            type="number"
                            value={eaConfig.riskManagement.stopLoss}
                            onChange={(e) => updateRiskManagement('stopLoss', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                          />
                          <p className="text-xs text-gray-500 mt-1">จำนวน pips ที่จะตั้ง Stop Loss</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Take Profit (pips)</label>
                          <input
                            type="number"
                            value={eaConfig.riskManagement.takeProfit}
                            onChange={(e) => updateRiskManagement('takeProfit', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                          />
                          <p className="text-xs text-gray-500 mt-1">จำนวน pips ที่จะตั้ง Take Profit</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Lot Size</label>
                          <input
                            type="number"
                            step="0.01"
                            min="0.01"
                            value={eaConfig.riskManagement.lotSize}
                            onChange={(e) => updateRiskManagement('lotSize', parseFloat(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                          />
                          <p className="text-xs text-gray-500 mt-1">ขนาด Lot ที่จะใช้ในการเปิด Order</p>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="trailing-stop"
                            checked={eaConfig.riskManagement.trailingStop}
                            onChange={(e) => updateRiskManagement('trailingStop', e.target.checked)}
                            className="h-4 w-4 text-brand-blue focus:ring-brand-blue rounded border-gray-300 mr-2"
                          />
                          <label htmlFor="trailing-stop" className="text-sm font-medium text-gray-700">
                            ใช้ Trailing Stop
                          </label>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Payment Modal */}
      {paymentModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">ชำระเงินเพื่อดาวน์โหลด EA</h2>
              <button onClick={() => setPaymentModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <p className="text-gray-700">คุณได้สร้าง EA เสร็จสมบูรณ์แล้ว! เพื่อดาวน์โหลดไฟล์ EA โปรดชำระเงินตามรายละเอียดด้านล่าง</p>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">EA ที่สร้าง</span>
                  <span className="font-medium">{eaName}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">จำนวนเงื่อนไขทั้งหมด</span>
                  <span className="font-medium">
                    {eaConfig.entryConditions.length + eaConfig.exitConditions.length}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                  <span className="text-gray-600">ราคารวม</span>
                  <span className="font-bold">฿990.00</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">บัตรเครดิต/เดบิต</label>
                <div className="border border-gray-300 rounded-md px-3 py-2 mb-4 bg-white">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">1234 5678 9012 3456</span>
                    <div className="flex space-x-2">
                      <img src="https://via.placeholder.com/30x20" alt="Visa" className="h-5" />
                      <img src="https://via.placeholder.com/30x20" alt="Mastercard" className="h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handlePayment} 
              className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white"
              disabled={paymentProcessing}
            >
              {paymentProcessing ? "กำลังประมวลผล..." : "ชำระเงิน ฿990.00"}
            </Button>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Builder;
