import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ExternalLink } from "lucide-react";
import Head from "@/components/Head";
import siteConfig from "@/config/config";

const BrokerRecommendation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <title>โบรกเกอร์แนะนำ | EA Wizard</title>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
              โบรกเกอร์แนะนำ
            </h1>
            
            <Card className="overflow-hidden border-2 border-brand-blue shadow-lg">
              <CardHeader className="bg-gradient-to-r from-brand-blue to-brand-lightBlue text-white pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl md:text-3xl">XM Trading</CardTitle>
                    <CardDescription className="text-white/90 text-lg">โบรกเกอร์ที่เราแนะนำสำหรับการเทรด Forex</CardDescription>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <img 
                      src={siteConfig.brokerImage} 
                      alt="XM Trading Logo" 
                      className="w-32 h-32 object-contain"
                    />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="px-6 py-8">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">ทำไมเราแนะนำ XM Trading</h3>
                    <p className="text-gray-600 mb-6">
                      XM Trading เป็นโบรกเกอร์ระดับโลกที่เชื่อถือได้และเหมาะสำหรับทั้งนักเทรดมือใหม่และมืออาชีพ มีประสบการณ์มากกว่า 10 ปีในวงการ Forex พร้อมให้บริการลูกค้ามากกว่า 170 ประเทศทั่วโลก
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-lg mb-3 text-gray-800">ข้อดีของ XM Trading</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span>เปิดบัญชีเทรดขั้นต่ำเพียง $5</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span>เลเวอเรจสูงสุดถึง 1:1000</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span>สามารถใช้ EA ได้อย่างไม่มีข้อจำกัด</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span>รองรับการฝากถอนที่รวดเร็วผ่านธนาคารไทย</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span>มีทีมซัพพอร์ตภาษาไทยตลอด 24 ชั่วโมง</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-lg mb-3 text-gray-800">บริการที่โดดเด่น</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span>โบนัสเงินฝากสูงสุด 100%</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span>แพลตฟอร์ม MT4 และ MT5 เสถียร รองรับการใช้งาน EA</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span>ไม่มีค่าคอมมิชชั่นในการเทรด</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span>การันตีการป้องกันยอดติดลบ (Negative Balance Protection)</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span>กิจกรรมและโปรโมชั่นพิเศษตลอดปี</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="bg-gray-50 border-t py-6 px-6">
                <div className="w-full text-center">
                  <p className="text-lg font-medium mb-4 text-gray-700">
                    เริ่มต้นเทรดกับ XM Trading วันนี้และรับสิทธิพิเศษมากมายสำหรับผู้สมัครใหม่
                  </p>
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 gap-2" asChild>
                    <a href={siteConfig.brokerSignupUrl} target="_blank" rel="noopener noreferrer">
                      {siteConfig.brokerSignupText} <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BrokerRecommendation;
