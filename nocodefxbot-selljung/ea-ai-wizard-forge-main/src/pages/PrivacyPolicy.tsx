
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Info } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-12">
        <title>นโยบายความเป็นส่วนตัว | EA Wizard</title>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <Shield className="h-10 w-10 text-brand-blue mr-2" />
            <h1 className="text-3xl font-bold">นโยบายความเป็นส่วนตัว</h1>
          </div>
          
          <div className="bg-brand-blue/10 p-4 rounded-lg mb-8 flex items-start">
            <Info className="h-5 w-5 text-brand-blue mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm">
              นโยบายความเป็นส่วนตัวนี้อธิบายวิธีการที่เราเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลของคุณเมื่อคุณใช้บริการของเรา 
              โปรดอ่านนโยบายนี้อย่างละเอียดเพื่อทำความเข้าใจวิธีการที่เราจัดการกับข้อมูลส่วนบุคคลของคุณ
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">1. ข้อมูลที่เราเก็บรวบรวม</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">ข้อมูลส่วนบุคคล</h3>
                <p className="text-muted-foreground">
                  เมื่อคุณลงทะเบียนใช้บริการของเรา เราอาจขอให้คุณให้ข้อมูลส่วนบุคคลบางอย่าง ซึ่งรวมถึงกัดเพียง:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                  <li>ชื่อ-นามสกุล</li>
                  <li>ที่อยู่อีเมล</li>
                  <li>เบอร์โทรศัพท์</li>
                  <li>ที่อยู่สำหรับเรียกเก็บเงิน</li>
                  <li>ข้อมูลบัญชีผู้ใช้และรหัสผ่าน</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">ข้อมูลการใช้งาน</h3>
                <p className="text-muted-foreground">
                  เราอาจเก็บรวบรวมข้อมูลเกี่ยวกับวิธีที่คุณใช้บริการของเรา ซึ่งรวมถึง:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                  <li>ข้อมูลอุปกรณ์ (เช่น รุ่นอุปกรณ์ ระบบปฏิบัติการ เบราว์เซอร์)</li>
                  <li>ข้อมูลบันทึกการใช้งาน (เช่น เวลาและระยะเวลาที่คุณใช้บริการ)</li>
                  <li>ข้อมูลตำแหน่งที่ตั้ง</li>
                  <li>ข้อมูลเกี่ยวกับวิธีการโต้ตอบของคุณกับบริการของเรา</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">ข้อมูลทางการเงิน</h3>
                <p className="text-muted-foreground">
                  หากคุณซื้อบริการหรือสมัครสมาชิกแบบพรีเมียม เราอาจเก็บรวบรวมข้อมูลการชำระเงินของคุณ อย่างไรก็ตาม 
                  เราไม่จัดเก็บข้อมูลบัตรเครดิตหรือข้อมูลการชำระเงินที่มีความอ่อนไหวในระบบของเรา 
                  ข้อมูลเหล่านี้จะถูกประมวลผลโดยผู้ให้บริการชำระเงินที่เชื่อถือได้
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">2. วิธีการใช้ข้อมูลของคุณ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                เราใช้ข้อมูลส่วนบุคคลที่เก็บรวบรวมเพื่อวัตถุประสงค์ดังต่อไปนี้:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">การให้บริการ:</span> เพื่อจัดหา ดูแลรักษา และปรับปรุงบริการของเรา
                </li>
                <li>
                  <span className="font-medium text-foreground">การติดต่อสื่อสาร:</span> เพื่อติดต่อกับคุณเกี่ยวกับบัญชีของคุณ 
                  ตอบคำถามหรือคำร้องขอของคุณ และส่งข้อมูลสำคัญเกี่ยวกับบริการของเรา
                </li>
                <li>
                  <span className="font-medium text-foreground">การปรับปรุงบริการ:</span> เพื่อวิเคราะห์การใช้งานบริการของเรา และปรับปรุง
                  ประสบการณ์ของผู้ใช้
                </li>
                <li>
                  <span className="font-medium text-foreground">การตลาด:</span> เพื่อส่งการสื่อสารทางการตลาดเกี่ยวกับผลิตภัณฑ์และบริการของเรา 
                  (คุณสามารถเลือกไม่รับการสื่อสารเหล่านี้ได้ทุกเมื่อ)
                </li>
                <li>
                  <span className="font-medium text-foreground">การรักษาความปลอดภัย:</span> เพื่อปกป้องความปลอดภัยและความสมบูรณ์ของบริการของเรา
                </li>
                <li>
                  <span className="font-medium text-foreground">การปฏิบัติตามกฎหมาย:</span> เพื่อปฏิบัติตามข้อผูกพันทางกฎหมายที่เกี่ยวข้อง
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">3. การแบ่งปันข้อมูล</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                เราอาจเปิดเผยข้อมูลส่วนบุคคลของคุณกับบุคคลที่สามในสถานการณ์ดังต่อไปนี้:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">ผู้ให้บริการ:</span> เราอาจแบ่งปันข้อมูลกับผู้ให้บริการบุคคลที่สามที่ทำงานในนามของเรา
                  เพื่อช่วยให้บริการของเรา (เช่น บริการโฮสติ้ง ผู้ให้บริการอีเมล)
                </li>
                <li>
                  <span className="font-medium text-foreground">พันธมิตรทางธุรกิจ:</span> เราอาจแบ่งปันข้อมูลกับพันธมิตรทางธุรกิจของเราที่ให้บริการ
                  หรือฟังก์ชันการทำงานที่เกี่ยวข้องกับแพลตฟอร์มของเรา
                </li>
                <li>
                  <span className="font-medium text-foreground">การปฏิบัติตามกฎหมาย:</span> เราอาจเปิดเผยข้อมูลของคุณเมื่อจำเป็นต้องปฏิบัติตาม
                  กฎหมายที่เกี่ยวข้อง กระบวนการทางกฎหมาย หรือคำขอที่ถูกต้องจากหน่วยงานของรัฐ
                </li>
                <li>
                  <span className="font-medium text-foreground">การปกป้องสิทธิ์:</span> เราอาจเปิดเผยข้อมูลเมื่อจำเป็นเพื่อปกป้องสิทธิ์ ทรัพย์สิน 
                  หรือความปลอดภัยของเรา ผู้ใช้บริการของเรา หรือบุคคลอื่น
                </li>
              </ul>
              <p className="text-muted-foreground mt-4">
                เราจะไม่ขายข้อมูลส่วนบุคคลของคุณให้กับบุคคลที่สาม
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">4. ความปลอดภัยของข้อมูล</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                เราใช้มาตรการรักษาความปลอดภัยทางเทคนิคและองค์กรที่เหมาะสมเพื่อปกป้องข้อมูลส่วนบุคคลของคุณจากการสูญหาย การเข้าถึงโดยไม่ได้รับอนุญาต 
                การเปิดเผย การเปลี่ยนแปลง หรือการทำลาย อย่างไรก็ตาม โปรดทราบว่าไม่มีวิธีการส่งข้อมูลผ่านอินเทอร์เนงหรือวิธีการจัดเก็บข้อมูล
                อิเล็กทรอนิกส์ใดที่มีความปลอดภัย 100%
              </p>
              <p className="text-muted-foreground">
                มาตรการรักษาความปลอดภัยของเรารวมถึง:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>การเข้ารหัสข้อมูลที่ส่งระหว่างเบราว์เซอร์ของคุณและเซิร์ฟเวอร์ของเรา (SSL/TLS)</li>
                <li>การควบคุมการเข้าถึงทางกายภาพและอิเล็กทรอนิกส์ต่อเซิร์ฟเวอร์และฐานข้อมูลของเรา</li>
                <li>การฝึกอบรมพนักงานเกี่ยวกับแนวปฏิบัติด้านความเป็นส่วนตัวและความปลอดภัย</li>
                <li>การตรวจสอบแกะประมวกมาตรการความปลอดภัยอย่างสม่ำเสมอ</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">5. สิทธิ์ความเป็นส่วนตัวของคุณ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                คุณมีสิทธิ์เกี่ยวกับข้อมูลส่วนบุคคลของคุณดังนี้:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">สิทธิ์ในการเข้าถึง:</span> คุณมีสิทธิ์ขอสำเนาข้อมูลส่วนบุคคลของคุณที่เราเก็บรวบรวม
                </li>
                <li>
                  <span className="font-medium text-foreground">สิทธิ์ในการแก้ไข:</span> คุณมีสิทธิ์ขอให้เราแก้ไขข้อมูลที่ไม่ถูกต้องหรือไม่สมบูรณ์
                </li>
                <li>
                  <span className="font-medium text-foreground">สิทธิ์ในการลบ:</span> คุณมีสิทธิ์ขอให้เราลบข้อมูลส่วนบุคคลของคุณในบางสถานการณ์
                </li>
                <li>
                  <span className="font-medium text-foreground">สิทธิ์ในการจำกัดการประมวลผล:</span> คุณมีสิทธิ์ขอให้เราจำกัดการประมวลผลข้อมูล
                  ส่วนบุคคลของคุณในบางสถานการณ์
                </li>
                <li>
                  <span className="font-medium text-foreground">สิทธิ์ในการคัดค้าน:</span> คุณมีสิทธิ์คัดค้านการประมวลผลข้อมูลส่วนบุคคลของคุณในบางกรณี
                </li>
                <li>
                  <span className="font-medium text-foreground">สิทธิ์ในการถ่ายโอนข้อมูล:</span> คุณมีสิทธิ์ขอรับข้อมูลส่วนบุคคลของคุณในรูปแบบที่มี
                  โครงสร้างและใช้กันทั่วไป
                </li>
              </ul>
              <p className="text-muted-foreground mt-4">
                หากคุณต้องการใช้สิทธิ์เหล่านี้ โปรดติดต่อเราที่ privacy@eawizard.com
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">6. การเปลี่ยนแปลงนโยบายความเป็นส่วนตัว</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                เราอาจปรับปรุงนโยบายความเป็นส่วนตัวนี้เป็นครั้งคราวเพื่อสะท้อนถึงการเปลี่ยนแปลงในแนวทางปฏิบัติด้านความเป็นส่วนตัวของเรา 
                เราจะแจ้งให้คุณทราบเกี่ยวกับการเปลี่ยนแปลงที่สำคัญโดยการโพสต์ประกาศบนเว็บไซต์ของเราหรือส่งการแจ้งเตือนให้คุณโดยตรง 
                เราขอแนะนำให้คุณตรวจสอบนโยบายนี้เป็นระยะเพื่อรับทราบข้อมูลล่าสุดเกี่ยวกับแนวทางปฏิบัติด้านความเป็นส่วนตัวของเรา
              </p>
              <p className="text-muted-foreground mt-4">
                นโยบายความเป็นส่วนตัวนี้อัปเดตล่าสุดเมื่อ: 3 พฤษภาคม 2025
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">7. ติดต่อเรา</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                หากคุณมีคำถามหรือข้อกังวลเกี่ยวกับนโยบายความเป็นส่วนตัวนี้หรือแนวทางปฏิบัติด้านความเป็นส่วนตัวของเรา 
                โปรดติดต่อเราที่:
              </p>
              <div className="mt-4">
                <p className="font-medium">EA Wizard Co., Ltd.</p>
                <p>123 ถนนสุขุมวิท กรุงเทพมหานคร 10110</p>
                <p>อีเมล: privacy@eawizard.com</p>
                <p>โทรศัพท์: 02-123-4567</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
