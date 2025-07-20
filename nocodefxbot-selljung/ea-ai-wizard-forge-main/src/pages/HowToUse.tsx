
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { List, FileText, BrainCog, Users, Shield } from "lucide-react";

const HowToUse = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-12">
        <title>วิธีใช้งาน | EA Wizard</title>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-center">วิธีใช้งาน</h1>
          <p className="text-muted-foreground text-center mb-8">
            เรียนรู้การใช้งาน EA Wizard เพื่อสร้างระบบเทรดอัตโนมัติของคุณเอง
          </p>

          <Tabs defaultValue="builder" className="mb-12">
            <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-8">
              <TabsTrigger value="builder">สร้าง EA</TabsTrigger>
              <TabsTrigger value="ai-generator">สร้างด้วย AI</TabsTrigger>
              <TabsTrigger value="usage">การใช้งาน</TabsTrigger>
            </TabsList>
            
            <TabsContent value="builder">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <List className="h-6 w-6 text-brand-blue" />
                    การสร้าง EA ด้วยระบบลากวาง
                  </CardTitle>
                  <CardDescription>เรียนรู้วิธีการใช้งานระบบสร้าง EA แบบลากวาง</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">1. เลือกอินดิเคเตอร์</h3>
                      <p className="text-muted-foreground">
                        เลือกอินดิเคเตอร์ที่ต้องการใช้จากเมนูด้านซ้ายและลากไปวางในพื้นที่ทำงาน คุณสามารถเลือกได้หลากหลายอินดิเคเตอร์เช่น Moving Average, 
                        RSI, Bollinger Bands และอื่นๆ อีกมากมาย
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">2. กำหนดเงื่อนไขการเปิดออเดอร์</h3>
                      <p className="text-muted-foreground">
                        ตั้งค่าเงื่อนไขการเปิดออเดอร์โดยการเชื่อมโยงอินดิเคเตอร์เข้ากับโมดูล Entry Rules 
                        คุณสามารถสร้างเงื่อนไขได้หลากหลายรูปแบบ เช่น การตัดกันของเส้น MA, ค่า RSI เกินระดับที่กำหนด เป็นต้น
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">3. กำหนดการจัดการความเสี่ยง</h3>
                      <p className="text-muted-foreground">
                        ตั้งค่า Stop Loss และ Take Profit เพื่อจำกัดความเสียหายและกำหนดเป้าหมายกำไร 
                        คุณสามารถตั้งค่าเป็นจำนวนพิปส์คงที่หรือใช้อินดิเคเตอร์อื่นๆ มากำหนดได้
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">4. ทดสอบย้อนหลัง</h3>
                      <p className="text-muted-foreground">
                        ทดสอบ EA ของคุณกับข้อมูลย้อนหลัง (Backtest) เพื่อดูประสิทธิภาพและปรับปรุงกลยุทธ์ 
                        ระบบจะแสดงผลลัพธ์การทำกำไร/ขาดทุน, Drawdown และสถิติสำคัญอื่นๆ
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">5. สร้างไฟล์ EA</h3>
                      <p className="text-muted-foreground">
                        เมื่อพอใจกับผลลัพธ์แล้ว คลิกที่ปุ่ม "สร้าง EA" เพื่อสร้างไฟล์ EA พร้อมใช้งาน 
                        ระบบจะสร้างไฟล์ .ex4 (สำหรับ MT4) หรือ .ex5 (สำหรับ MT5) ให้คุณดาวน์โหลดไปใช้งาน
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="ai-generator">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BrainCog className="h-6 w-6 text-brand-blue" />
                    การสร้าง EA ด้วย AI
                  </CardTitle>
                  <CardDescription>เรียนรู้วิธีการใช้งาน AI Generator เพื่อสร้าง EA แบบอัตโนมัติ</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">1. อธิบายกลยุทธ์การเทรด</h3>
                      <p className="text-muted-foreground">
                        เพียงอธิบายกลยุทธ์การเทรดที่คุณต้องการเป็นภาษาธรรมชาติ เช่น "ฉันต้องการ EA ที่เทรดโดยใช้ Golden Cross 
                        ของ Moving Average 50 และ 200 พร้อมตั้ง Stop Loss 50 pips และ Take Profit 100 pips"
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">2. ปรับแต่งพารามิเตอร์</h3>
                      <p className="text-muted-foreground">
                        AI จะวิเคราะห์คำอธิบายของคุณและสร้าง EA พร้อมพารามิเตอร์ที่แนะนำ คุณสามารถปรับแต่งพารามิเตอร์เหล่านี้ได้ตามต้องการ
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">3. ทดสอบย้อนหลัง</h3>
                      <p className="text-muted-foreground">
                        ทดสอบ EA ที่สร้างขึ้นโดย AI กับข้อมูลย้อนหลังเพื่อดูประสิทธิภาพ 
                        คุณสามารถให้คำแนะนำเพิ่มเติมเพื่อให้ AI ปรับปรุง EA ให้ดียิ่งขึ้น
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">4. สร้างไฟล์ EA</h3>
                      <p className="text-muted-foreground">
                        เมื่อพอใจกับผลลัพธ์แล้ว คลิกที่ปุ่ม "สร้าง EA" เพื่อสร้างไฟล์ EA พร้อมใช้งาน
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="usage">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-6 w-6 text-brand-blue" />
                    การใช้งาน EA ที่สร้าง
                  </CardTitle>
                  <CardDescription>เรียนรู้วิธีการนำ EA ไปติดตั้งและใช้งาน</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">1. ดาวน์โหลดไฟล์ EA</h3>
                      <p className="text-muted-foreground">
                        ดาวน์โหลดไฟล์ EA (.ex4 สำหรับ MT4 หรือ .ex5 สำหรับ MT5) ที่ได้สร้างขึ้น ไฟล์นี้จะถูกใช้ในการติดตั้งบนแพลตฟอร์ม MetaTrader
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">2. ติดตั้งบนแพลตฟอร์ม MetaTrader</h3>
                      <p className="text-muted-foreground">
                        เปิดแพลตฟอร์ม MetaTrader และไปที่ File {'>'} Open Data Folder จากนั้นไปที่โฟลเดอร์ MQL4/Experts (สำหรับ MT4) 
                        หรือ MQL5/Experts (สำหรับ MT5) และคัดลอกไฟล์ EA ของคุณไปยังโฟลเดอร์นี้
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">3. เปิดใช้งาน EA</h3>
                      <p className="text-muted-foreground">
                        กลับไปที่แพลตฟอร์ม MetaTrader และรีสตาร์ทโปรแกรม จากนั้นเปิดชาร์ตคู่เงินที่ต้องการเทรด 
                        ลากและวาง EA จากหน้าต่าง Navigator ไปยังชาร์ต
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">4. ตั้งค่าพารามิเตอร์</h3>
                      <p className="text-muted-foreground">
                        ปรับแต่งพารามิเตอร์ของ EA ตามต้องการในหน้าต่างที่ปรากฏขึ้น เช่น ขนาดล็อต, 
                        Stop Loss, Take Profit และพารามิเตอร์อื่นๆ
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">5. เริ่มเทรดอัตโนมัติ</h3>
                      <p className="text-muted-foreground">
                        ตรวจสอบให้แน่ใจว่าปุ่ม "AutoTrading" ถูกเปิดใช้งาน (สีเขียว) และ EA จะเริ่มทำงานอัตโนมัติตามกลยุทธ์ที่คุณได้ตั้งค่าไว้
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="bg-muted rounded-lg p-6 text-center">
            <h2 className="text-xl font-medium mb-4">ต้องการความช่วยเหลือเพิ่มเติม?</h2>
            <p className="mb-4">
              หากคุณต้องการคำแนะนำเพิ่มเติมหรือพบปัญหาในการใช้งาน ทีมงานของเราพร้อมให้ความช่วยเหลือ
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/contact" className="inline-flex items-center justify-center bg-brand-blue hover:bg-brand-blue/90 text-white py-2 px-4 rounded">
                <Users className="mr-2 h-5 w-5" />
                ติดต่อทีมงาน
              </a>
              <a href="/faq" className="inline-flex items-center justify-center bg-white border border-brand-blue text-brand-blue py-2 px-4 rounded hover:bg-brand-blue/10">
                <Shield className="mr-2 h-5 w-5" />
                ดูคำถามที่พบบ่อย
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HowToUse;
