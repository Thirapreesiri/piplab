import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GraduationCap, BookOpen, Mail } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import siteConfig from "@/config/config";
import Head from "@/components/Head";

const Course = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("กรุณากรอกอีเมลของคุณ");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(siteConfig.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          email,
          timestamp: new Date().toISOString(),
          source: "course_page"
        }),
      });
      
      toast.success("ขอบคุณที่ลงทะเบียน! เราจะส่งรายละเอียดคอร์สให้คุณทางอีเมล");
      setEmail("");
    } catch (error) {
      console.error("Error sending data to webhook:", error);
      toast.error("เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Head title="คอร์สเรียนการเทรด Forex | EA Wizard" />
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="max-w-5xl mx-auto mb-16 text-center">
            <div className="inline-flex items-center justify-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-4">
              <GraduationCap className="mr-2 h-5 w-5" />
              <span className="font-medium">คอร์สเรียน Forex พื้นฐานสำหรับมือใหม่</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              เริ่มต้นเทรด Forex ง่ายๆ<br />
              <span className="text-brand-blue">ภายใน 7 วัน</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              คอร์สเรียนที่ออกแบบมาสำหรับผู้ที่ไม่เคยเทรดมาก่อน หรือเคยฟังแต่ยังไม่เข้าใจ ให้สามารถเข้าใจการเทรดพื้นฐาน รู้จักเครื่องมือ วิเคราะห์เบื้องต้น และเริ่มเทรดบัญชีทดลองได้
            </p>
          </div>
          
          {/* Course Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <BookOpen className="h-10 w-10 text-brand-blue mb-2" />
                <CardTitle className="text-xl">รู้จักตลาด Forex</CardTitle>
                <CardDescription>บทที่ 1-2: พื้นฐานที่จำเป็น</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-blue rounded-full" />
                    <span>Forex และคู่เงิน</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-blue rounded-full" />
                    <span>เวลาเปิด-ปิดตลาด</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-blue rounded-full" />
                    <span>Buy/Sell และ Spread</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-blue rounded-full" />
                    <span>Leverage และ Lot Size</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Mail className="h-10 w-10 text-brand-blue mb-2" />
                <CardTitle className="text-xl">เครื่องมือวิเคราะห์</CardTitle>
                <CardDescription>บทที่ 3-4: การวิเคราะห์และปฏิบัติ</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-blue rounded-full" />
                    <span>กราฟแท่งเทียน</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-blue rounded-full" />
                    <span>แนวรับ-แนวต้าน</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-blue rounded-full" />
                    <span>อินดิเคเตอร์ยอดนิยม</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-blue rounded-full" />
                    <span>ฝึกใช้ MetaTrader</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <GraduationCap className="h-10 w-10 text-brand-blue mb-2" />
                <CardTitle className="text-xl">การจัดการและวางแผน</CardTitle>
                <CardDescription>บทที่ 5-7: สู่การเป็นเทรดเดอร์</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-blue rounded-full" />
                    <span>Money Management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-blue rounded-full" />
                    <span>Trading Plan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-blue rounded-full" />
                    <span>Trading Journal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-blue rounded-full" />
                    <span>แนวทางต่อยอด</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Course details */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="bg-gradient-to-r from-brand-blue to-brand-lightBlue rounded-xl overflow-hidden shadow-xl">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-8 text-white">
                  <h2 className="text-3xl font-bold mb-4">สิ่งที่คุณจะได้รับ</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="bg-white/20 p-1 rounded mt-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                      </span>
                      <span className="text-lg">วิดีโอสอนใน YouTube</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-white/20 p-1 rounded mt-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                      </span>
                      <span className="text-lg">คอร์สเรียนออนไลน์</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-white/20 p-1 rounded mt-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                      </span>
                      <span className="text-lg">เอกสารประกอบการเรียน PDF</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-white/20 p-1 rounded mt-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                      </span>
                      <span className="text-lg">เข้าร่วม Facebook Group</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-white/20 p-1 rounded mt-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                      </span>
                      <span className="text-lg">ทดลองเทรดกับบัญชีจำลอง</span>
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <img 
                    src="img/fx5.png" 
                    alt="คอร์สเรียนเทรด Forex" 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
                ลงทะเบียนรับข้อมูลคอร์สเรียนฟรี
              </h2>
              <p className="text-center text-gray-600 mb-8">
                กรอกอีเมลของคุณเพื่อรับข้อมูลเพิ่มเติมเกี่ยวกับคอร์สเรียน รวมถึงเนื้อหาพิเศษที่เราจัดเตรียมไว้สำหรับคุณ
              </p>
              
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="อีเมลของคุณ"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="bg-brand-blue hover:bg-brand-blue/90" 
                    disabled={isLoading}
                  >
                    {isLoading ? "กำลังส่งข้อมูล..." : "สมัครรับข้อมูล"}
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500 text-center">
                  เราเคารพความเป็นส่วนตัวของคุณ และจะไม่เผยแพร่ข้อมูลของคุณให้บุคคลที่สาม
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Course;
