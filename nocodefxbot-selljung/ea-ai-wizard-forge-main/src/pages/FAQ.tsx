
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-12">
        <title>คำถามที่พบบ่อย | EA Wizard</title>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">คำถามที่พบบ่อย</h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">เกี่ยวกับ EA Wizard</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">EA Wizard คืออะไร?</AccordionTrigger>
                  <AccordionContent>
                    EA Wizard คือแพลตฟอร์มสำหรับสร้าง Expert Advisor (EA) สำหรับการเทรด Forex แบบง่ายๆ 
                    ด้วยระบบลากวางและเทคโนโลยี AI โดยไม่จำเป็นต้องมีความรู้ด้านการเขียนโค้ด
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">EA Wizard ใช้งานฟรีหรือไม่?</AccordionTrigger>
                  <AccordionContent>
                    EA Wizard มีทั้งส่วนที่ใช้งานฟรีและส่วนพรีเมียม โดยผู้ใช้สามารถสร้าง EA ขั้นพื้นฐานได้ฟรี 
                    ส่วนฟีเจอร์ขั้นสูงจะอยู่ในแพ็กเกจพรีเมียม
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">EA ที่สร้างจาก EA Wizard ใช้ได้กับโบรกเกอร์ไหนบ้าง?</AccordionTrigger>
                  <AccordionContent>
                    EA ที่สร้างจากแพลตฟอร์มของเราสามารถใช้ได้กับโบรกเกอร์ที่รองรับ MetaTrader 4 และ MetaTrader 5 
                    ซึ่งครอบคลุมโบรกเกอร์ส่วนใหญ่ทั่วโลก เราขอแนะนำให้ใช้กับโบรกเกอร์ที่เราเป็นพาร์ทเนอร์ด้วยเพื่อประสบการณ์การใช้งานที่ดีที่สุด
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">การสร้างและใช้งาน EA</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">จำเป็นต้องมีความรู้ด้านการเขียนโค้ดหรือไม่?</AccordionTrigger>
                  <AccordionContent>
                    ไม่จำเป็นเลย EA Wizard ถูกออกแบบมาให้ผู้ใช้สามารถสร้าง EA ได้โดยไม่ต้องมีความรู้ด้านการเขียนโค้ด 
                    เพียงแค่ใช้ระบบลากวางหรือใช้ AI Generator ของเรา คุณก็สามารถสร้าง EA ได้อย่างง่ายดาย
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">สามารถปรับแต่งกลยุทธ์การเทรดได้มากแค่ไหน?</AccordionTrigger>
                  <AccordionContent>
                    EA Wizard รองรับการปรับแต่งกลยุทธ์การเทรดได้หลากหลาย ทั้งด้านเทคนิคอล อินดิเคเตอร์ต่างๆ 
                    การตั้งค่า Stop Loss, Take Profit และอื่นๆ อีกมากมาย คุณสามารถสร้างกลยุทธ์ที่เหมาะกับสไตล์การเทรดของคุณได้อย่างอิสระ
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left">EA ที่สร้างมีประสิทธิภาพเทียบเท่ากับ EA ที่เขียนโค้ดโดยตรงหรือไม่?</AccordionTrigger>
                  <AccordionContent>
                    ใช่ EA ที่สร้างจาก EA Wizard มีประสิทธิภาพเทียบเท่ากับ EA ที่เขียนโค้ดโดยตรง 
                    เนื่องจากเราใช้เทคโนโลยีการแปลงจากระบบลากวางเป็นโค้ดที่มีประสิทธิภาพสูง ทำให้ EA ทำงานได้รวดเร็วและแม่นยำ
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">การสนับสนุนและช่วยเหลือ</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-left">มีคอร์สสอนการใช้งาน EA Wizard หรือไม่?</AccordionTrigger>
                  <AccordionContent>
                    มีแน่นอน เรามีคอร์สสอนการใช้งาน EA Wizard อย่างละเอียด รวมถึงคอร์สการเทรด Forex สำหรับผู้ที่สนใจ 
                    สามารถดูรายละเอียดเพิ่มเติมได้ที่หน้า "คอร์สเรียน" ของเรา
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-left">หากพบปัญหาในการใช้งานสามารถติดต่อได้ทางไหนบ้าง?</AccordionTrigger>
                  <AccordionContent>
                    คุณสามารถติดต่อทีมสนับสนุนของเราได้ผ่านทางหน้า "ติดต่อเรา" อีเมล โทรศัพท์ หรือช่องทางโซเชียลมีเดียต่างๆ ของเรา 
                    ทีมงานเราพร้อมให้ความช่วยเหลือตลอด 24 ชั่วโมง
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9">
                  <AccordionTrigger className="text-left">มีชุมชนสำหรับผู้ใช้งาน EA Wizard หรือไม่?</AccordionTrigger>
                  <AccordionContent>
                    มีครับ เรามีชุมชนสำหรับผู้ใช้งาน EA Wizard ทั้งบน Facebook Group และ Line กลุ่ม 
                    ที่คุณสามารถแลกเปลี่ยนความรู้ ประสบการณ์ และรับข้อมูลอัพเดทล่าสุดเกี่ยวกับแพลตฟอร์มของเรา
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
