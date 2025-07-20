import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sparkles, 
  Download, 
  Check, 
  Loader2, 
  XCircle, 
  BrainCog,
  ArrowRight
} from 'lucide-react';
import { toast } from "sonner";
import siteConfig from '@/config/config';
import { createEAFile } from '@/utils/eaGenerator';
import { EAConfig } from '@/types/ea';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mocked AI service providers
const AI_PROVIDERS = [
  { id: 'openai', name: 'OpenAI', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg', model: 'gpt-4.1-nano' },
  { id: 'gemini', name: 'Google Gemini', logo: 'https://seeklogo.com/images/G/google-gemini-logo-6D04F4193C-seeklogo.com.png', model: 'gemini-2.0-flash' }
];

const AIGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(AI_PROVIDERS[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEA, setGeneratedEA] = useState<string | null>(null);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  // Example prompt suggestions
  const promptSuggestions = [
    "สร้าง EA ที่เข้าคำสั่งซื้อเมื่อ RSI ต่ำกว่า 30 และขายเมื่อ RSI สูงกว่า 70",
    "สร้าง EA ที่เทรดตามแนวโน้มโดยใช้ Moving Average 50 และ 200",
    "สร้าง EA ที่ใช้ MACD เป็นสัญญาณเข้าเทรดและมี Trailing Stop 20 pips"
  ];

  // Handle prompt submission
  const handleGenerateEA = () => {
    if (!prompt.trim()) {
      toast.error("กรุณาใส่คำอธิบาย EA ที่ต้องการสร้าง");
      return;
    }

    // Check if API key is provided
    if (!apiKey) {
      setIsApiKeyModalOpen(true);
      return;
    }

    setIsGenerating(true);
    const selectedModel = AI_PROVIDERS.find(p => p.id === selectedProvider)?.model || '';
    toast.info(`กำลังสร้าง EA ด้วย ${selectedProvider === 'openai' ? 'OpenAI' : 'Google Gemini'} (${selectedModel})...`);

    // Mock API call
    setTimeout(() => {
      // สร้าง EA config จากการวิเคราะห์ prompt
      // ในตัวอย่างนี้เราจะสร้าง config แบบง่ายๆ
      const mockEAConfig: EAConfig = {
        entryConditions: [
          {
            id: 'rsi-' + Date.now(),
            type: 'entry',
            name: 'RSI Overbought/Oversold',
            parameters: {
              period: 14,
              overbought: 70,
              oversold: 30
            }
          }
        ],
        exitConditions: [
          {
            id: 'time-' + Date.now(),
            type: 'exit',
            name: 'Exit after Time',
            parameters: {
              minutes: 60
            }
          }
        ],
        riskManagement: {
          stopLoss: 50,
          takeProfit: 100,
          trailingStop: true,
          lotSize: 0.1
        }
      };
      
      // สร้างโค้ด EA จาก config
      setGeneratedEA(JSON.stringify(mockEAConfig));
      setIsGenerating(false);
      toast.success("สร้าง EA สำเร็จแล้ว!");
    }, 3000);
  };

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast.error("กรุณากรอก API Key");
      return;
    }
    
    toast.success("บันทึก API Key สำเร็จ");
    setIsApiKeyModalOpen(false);
    // After API key is saved, trigger the generation
    handleGenerateEA();
  };

  const handleDownload = () => {
    setPaymentModalOpen(true);
  };

  // Mock payment process
  const handlePayment = () => {
    toast.loading("กำลังประมวลผลการชำระเงิน...");
    
    setTimeout(() => {
      toast.dismiss();
      toast.success("ชำระเงินสำเร็จ!");
      setPaymentModalOpen(false);
      
      // สร้างและดาวน์โหลดไฟล์ EA
      if (generatedEA) {
        try {
          const eaConfig: EAConfig = JSON.parse(generatedEA);
          const eaFile = createEAFile(eaConfig, "AI_Generated_EA");
          
          // สร้าง URL และดาวน์โหลดไฟล์
          const url = URL.createObjectURL(eaFile);
          const a = document.createElement('a');
          a.href = url;
          a.download = eaFile.name;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          
          toast.success("ดาวน์โหลด EA สำเร็จ!");
        } catch (error) {
          console.error("Error creating EA file:", error);
          toast.error("เกิดข้อผิดพลาดในการสร้างไฟล์ EA");
        }
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <title>สร้าง EA ด้วย AI | EA Wizard</title>
          {/* Title section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">สร้าง Expert Advisor ด้วย AI</h1>
            <p className="text-gray-600 mt-2">
              อธิบายกลยุทธ์การเทรดของคุณเป็นภาษาพูดธรรมดาและให้ AI สร้างโค้ด EA ให้กับ
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <h2 className="text-xl font-medium mb-4">เลือก AI Provider</h2>
              <div className="flex gap-4 mb-6">
                {AI_PROVIDERS.map(provider => (
                  <button
                    key={provider.id}
                    onClick={() => setSelectedProvider(provider.id)}
                    className={`flex-1 border ${selectedProvider === provider.id ? 'border-brand-blue ring-2 ring-brand-blue/20' : 'border-gray-200'} rounded-lg p-4 flex flex-col items-center hover:bg-gray-50 transition-colors`}
                  >
                    <img src={provider.logo} alt={provider.name} className="h-8 mb-2" style={{ maxWidth: '100px' }} />
                    <span className={selectedProvider === provider.id ? 'font-medium text-brand-blue' : 'text-gray-700'}>
                      {provider.name}
                    </span>
                    {selectedProvider === provider.id && (
                      <div className="mt-2 flex items-center bg-brand-blue/10 text-brand-blue px-2 py-1 rounded text-xs">
                        <Check className="h-3 w-3 mr-1" />
                        เลือกแล้ว
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-medium">อธิบายกลยุทธ์การเทรด</h2>
                <button 
                  onClick={() => setIsApiKeyModalOpen(true)} 
                  className="text-brand-blue text-sm hover:underline"
                >
                  ตั้งค่า API Key
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                อธิบายว่าคุณต้องการ EA แบบไหน อินดิเคเตอร์อะไร เงื่อนไขการเข้าและออกตลาดอย่างไร รวมถึงการจัดการความเสี่ยง
              </p>
              <Textarea
                value={prompt}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
                placeholder="เช่น: สร้าง EA ที่เข้าคำสั่งซื้อเมื่อ RSI ต่ำกว่า 30 และขายเมื่อ RSI สูงกว่า 70 โดยมีการตั้งค่า Stop Loss 50 pips และ Take Profit 100 pips"
                className="min-h-[150px] mb-4"
              />
              
              <div>
                <p className="text-sm text-gray-600 mb-2">ตัวอย่างคำอธิบาย:</p>
                <div className="flex flex-wrap gap-2">
                  {promptSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setPrompt(suggestion)}
                      className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700"
                    >
                      {suggestion.length > 50 ? `${suggestion.substring(0, 50)}...` : suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleGenerateEA} 
              className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white"
              disabled={isGenerating || !prompt.trim()}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  กำลังสร้าง...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  สร้าง EA ด้วย AI
                </>
              )}
            </Button>
            
            {generatedEA && (
              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">ผลลัพธ์</h3>
                  <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    ดาวน์โหลด EA
                  </Button>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto max-h-[400px]">
                  <pre className="text-sm font-mono whitespace-pre-wrap">{generatedEA}</pre>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  * EA ที่สร้างขึ้นพร้อมใช้งานกับ MetaTrader 4 และสามารถปรับแต่งพารามิเตอร์ได้ตามต้องการ
                </p>
              </div>
            )}
          </div>
          
          {/* How It Works Section */}
          <div className="max-w-4xl mx-auto mt-12">
            <h2 className="text-2xl font-bold text-center mb-8">วิธีการสร้าง EA ด้วย AI</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 bg-brand-blue/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <BrainCog className="h-6 w-6 text-brand-blue" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">อธิบายกลยุทธ์</h3>
                  <p className="text-gray-600 text-sm">
                    เขียนอธิบายกลยุทธ์การเทรดของคุณเป็นภาษาพูดธรรมดา ยิ่งอธิบายละเอียดเท่าไหร่ EA ที่ได้ยิ่งตรงตามความต้องการ
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 bg-brand-blue/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-brand-blue" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">AI สร้างโค้ด</h3>
                  <p className="text-gray-600 text-sm">
                    AI จะวิเคราะห์คำอธิบายของคุณและสร้างโค้ด Expert Advisor ที่พร้อมใช้งานได้ทันทีบน MetaTrader
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 bg-brand-blue/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Download className="h-6 w-6 text-brand-blue" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">ดาวน์โหลด EA</h3>
                  <p className="text-gray-600 text-sm">
                    ตรวจสอบโค้ดที่สร้างขึ้น ชำระเงิน และดาวน์โหลดไฟล์ EA ไปใช้งานกับโปรแกรม MetaTrader 4 ได้ทันที
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-10">
              <Button 
                onClick={() => document.getElementById('prompt-section')?.scrollIntoView({ behavior: 'smooth' })} 
                className="bg-brand-blue hover:bg-brand-blue/90 text-white"
              >
                เริ่มสร้าง EA ด้วย AI ตอนนี้ <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      {/* API Key Modal */}
      {isApiKeyModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">ตั้งค่า API Key</h2>
              <button onClick={() => setIsApiKeyModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                กรุณาใส่ API Key สำหรับ {selectedProvider === 'openai' ? 'OpenAI' : 'Google Gemini'} เพื่อใช้งาน
                โดยคุณสามารถรับ API Key ได้จากเว็บไซต์ของผู้ให้บริการโดยตรง
              </p>
              
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {selectedProvider === 'openai' ? 'OpenAI' : 'Google Gemini'} API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                placeholder="sk-..."
              />
              
              <p className="text-xs text-gray-500 mt-2">
                API Key จะถูกเก็บไว้เฉพาะในเบราว์เซอร์ของคุณเท่านั้น และจะไม่ถูกส่งไปยังเซิร์ฟเวอร์ของเรา
              </p>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button 
                variant="outline" 
                onClick={() => setIsApiKeyModalOpen(false)}
              >
                ยกเลิก
              </Button>
              <Button 
                onClick={handleSaveApiKey} 
                className="bg-brand-blue hover:bg-brand-blue/90 text-white"
              >
                บันทึก API Key
              </Button>
            </div>
          </div>
        </div>
      )}
      
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
              <p className="text-gray-700">สร้าง EA ด้วย AI สำเร็จแล้ว! เพื่อดาวน์โหลดไฟล์ EA โปรดชำระเงินตามรายละเอียดด้านล่าง</p>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">รายการ</span>
                  <span className="font-medium">EA ที่สร้างด้วย AI</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">AI Provider</span>
                  <span className="font-medium">
                    {selectedProvider === 'openai' ? 'OpenAI' : 'Google Gemini'}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                  <span className="text-gray-600">ราคารวม</span>
                  <span className="font-bold">฿690.00</span>
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
            >
              ชำระเงิน ฿690.00
            </Button>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default AIGenerator;
