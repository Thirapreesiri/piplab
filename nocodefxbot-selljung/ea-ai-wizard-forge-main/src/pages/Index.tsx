import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Code, BrainCog, Sparkles, GraduationCap, ExternalLink, Mail } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Head from '@/components/Head';
import Banner from '@/components/Banner';
import LineButton from '@/components/LineButton';
import siteConfig from '@/config/config';

const Index = () => {
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
          source: "index_page"
        }),
      });
      
      toast.success("ขอบคุณที่ลงทะเบียน! เราจะส่งข้อมูลให้คุณทางอีเมล");
      setEmail("");
    } catch (error) {
      console.error("Error sending data to webhook:", error);
      toast.error("เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      title: "สร้าง EA แบบลากวาง",
      description: "สร้าง Expert Advisor ด้วยระบบลากวางที่ใช้งานง่าย ไม่จำเป็นต้องเขียนโค้ด",
      icon: Code
    },
    {
      title: "เลือกเงื่อนไขได้อย่างอิสระ",
      description: "กำหนดเงื่อนไขการเข้าออกตลาด กำหนด Stop Loss และ Take Profit ได้ตามต้องการ",
      icon: Check
    },
    {
      title: "สร้างด้วย AI",
      description: "ใช้เทคโนโลยี AI สร้าง Expert Advisor จากการอธิบายกลยุทธ์การเทรดเป็นภาษาพูด",
      icon: BrainCog
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Head />
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="ea-container py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-10 lg:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-blue to-brand-green text-transparent bg-clip-text">
                  สร้าง EA Forex ง่ายๆ <br />ไม่ต้องเขียนโค้ด
                </h1>
                <p className="text-gray-600 text-lg mb-8">
                  {siteConfig.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-brand-blue hover:bg-brand-blue/90 text-white">
                    <Link to="/builder">
                      เริ่มสร้าง EA <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue/10">
                    <Link to="/ai-generator">
                      สร้างด้วย AI <Sparkles className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <LineButton />
                </div>
              </div>
              <div className="lg:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 to-brand-green/20 rounded-2xl filter blur-xl opacity-30 -z-10"></div>
                  <Banner />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">เครื่องมือสำหรับทุกระดับประสบการณ์</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                ไม่ว่าคุณจะเป็นผู้เทรดมือใหม่หรือผู้เชี่ยวชาญ เราช่วยให้คุณสร้าง EA ได้ง่ายดาย
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="p-3 bg-brand-blue/10 inline-block rounded-full mb-6">
                    <feature.icon className="h-6 w-6 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold mb-3">วิธีการสร้าง EA กับเรา</h2>
              <p className="text-gray-600 text-sm max-w-xl mx-auto">
                กระบวนการในการสร้าง Expert Advisor กับเราเป็นเรื่องง่าย เพียงไม่กี่ขั้นตอน
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-brand-blue/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-brand-blue">1</span>
                </div>
                <h3 className="text-lg font-bold mb-2">เลือกโมดูลและเงื่อนไข</h3>
                <p className="text-gray-600 text-sm">
                  เลือกเงื่อนไขในการเข้าตลาด สัญญาณทางเทคนิค และกำหนดพารามิเตอร์
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-brand-blue/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-brand-blue">2</span>
                </div>
                <h3 className="text-lg font-bold mb-2">ดูสรุปและทดสอบ</h3>
                <p className="text-gray-600 text-sm">
                  ระบบจะสรุปเงื่อนไขทั้งหมดที่คุณตั้งค่า พร้อมตรวจสอบให้ก่อนดาวน์โหลด
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-brand-blue/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-brand-blue">3</span>
                </div>
                <h3 className="text-lg font-bold mb-2">ดาวน์โหลดและใช้งาน</h3>
                <p className="text-gray-600 text-sm">
                  ดาวน์โหลด EA ไปใช้งานได้ฟรีทันที ไม่มีค่าใช้จ่าย
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button asChild size="default" className="bg-brand-blue hover:bg-brand-blue/90 text-white">
                <Link to="/builder">
                  เริ่มสร้าง EA ตอนนี้ <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* AI Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 to-purple-500/20 rounded-2xl filter blur-xl opacity-30 -z-10"></div>
                  <img 
                    src={siteConfig.aiGeneratorImage} 
                    alt="AI powered EA generation" 
                    className="rounded-2xl shadow-2xl border border-white/20 w-full object-cover max-w-lg"
                  />
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold mb-6">
                  สร้าง EA ด้วยพลัง <span className="bg-gradient-to-r from-brand-blue to-purple-600 text-transparent bg-clip-text">AI</span>
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  อธิบายกลยุทธ์การเทรดเป็นคำพูดธรรมดา แล้วให้ AI ของเราแปลงเป็นโค้ด Expert Advisor ที่ใช้งานได้จริง
                  เชื่อมต่อกับ Gemini และ OpenAI เพื่อผลลัพธ์ที่ดีที่สุด
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-green mr-2 mt-1 flex-shrink-0" />
                    <span>แปลงภาษาพูดเป็นโค้ด EA ที่ใช้งานได้จริง</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-green mr-2 mt-1 flex-shrink-0" />
                    <span>ปรับแต่งและแก้ไขตามความต้องการได้</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-green mr-2 mt-1 flex-shrink-0" />
                    <span>รองรับภาษาไทยและภาษาอังกฤษ</span>
                  </li>
                </ul>
                <Button asChild size="lg" className="bg-brand-blue hover:bg-brand-blue/90 text-white">
                  <Link to="/ai-generator">
                    ลองสร้าง EA ด้วย AI <Sparkles className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Broker Recommendation Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold mb-3">โบรกเกอร์แนะนำ</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  เราคัดสรรโบรกเกอร์ที่เหมาะสมสำหรับการใช้งาน EA ของเรา ด้วยเงื่อนไขที่ดีที่สุดสำหรับนักเทรด
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 bg-brand-blue p-6 text-white flex items-center justify-center">
                    <div className="text-center">
                      <div className="bg-white rounded-xl p-4 shadow-md mb-4 mx-auto w-24 h-24 flex items-center justify-center">
                        <img 
                          src={siteConfig.brokerImage} 
                          alt="XM Trading Logo" 
                          className="w-20 h-20 object-contain"
                        />
                      </div>
                      <h3 className="text-xl font-bold mb-2">XM Trading</h3>
                      <p className="text-white/80 text-sm">โบรกเกอร์ที่เราแนะนำ</p>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 p-6">
                    <h4 className="text-lg font-semibold mb-4">ทำไมเราแนะนำ XM Trading</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Check className="text-green-500 mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                            <span>เปิดบัญชีเทรดขั้นต่ำเพียง $5</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="text-green-500 mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                            <span>เลเวอเรจสูงสุดถึง 1:1000</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="text-green-500 mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                            <span>สามารถใช้ EA ได้อย่างไม่มีข้อจำกัด</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Check className="text-green-500 mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                            <span>โบนัสเงินฝากสูงสุด 100%</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="text-green-500 mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                            <span>รองรับการฝากถอนผ่านธนาคารไทย</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="text-green-500 mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                            <span>มีทีมซัพพอร์ตภาษาไทย 24 ชั่วโมง</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Button asChild className="bg-green-600 hover:bg-green-700 gap-2">
                        <a href={siteConfig.brokerSignupUrl} target="_blank" rel="noopener noreferrer">
                          {siteConfig.brokerSignupText} <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="ml-3 border-brand-blue text-brand-blue">
                        <Link to="/broker">
                          ดูรายละเอียดเพิ่มเติม
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course CTA Section */}
        <section className="py-16 bg-gradient-to-r from-brand-blue to-brand-green text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center max-w-5xl mx-auto">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <div className="bg-white/10 p-1 rounded-lg inline-block mb-4">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-4">พัฒนาทักษะการเทรดของคุณ</h2>
                <p className="mb-6 text-white/90">
                  เรียนรู้การเทรด Forex จากผู้เชี่ยวชาญ ด้วยคอร์สเรียนที่ออกแบบมาสำหรับทั้งมือใหม่และผู้มีประสบการณ์
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Check className="text-white mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                    <span>เรียนรู้ตั้งแต่พื้นฐานจนถึงเทคนิคขั้นสูง</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-white mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                    <span>เข้าถึงเครื่องมือวิเคราะห์ทางเทคนิคแบบมืออาชีพ</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-white mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                    <span>รับใบรับรองเมื่อจบคอร์ส</span>
                  </li>
                </ul>
                <Button asChild size="default" className="bg-white text-brand-blue hover:bg-white/90">
                  <Link to="/course">
                    ดูรายละเอียดคอร์สเรียน <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="md:w-1/2 md:pl-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
                  <img 
                    src={siteConfig.brokerImage} 
                    alt="คอร์สเรียนเทรด Forex" 
                    className="rounded-lg shadow-lg w-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg text-center">
                      <h3 className="text-xl font-bold mb-2">คอร์สเรียนการเทรด Forex</h3>
                      <p className="text-sm">เริ่มต้นเรียนรู้วันนี้</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-brand-blue/10 p-2 rounded-full">
                    <Mail className="h-6 w-6 text-brand-blue" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-center">
                  รับข่าวสารและเทคนิคการเทรดฟรี
                </h2>
                <p className="text-center text-gray-600 mb-6">
                  ลงทะเบียนเพื่อรับข่าวสาร เทคนิคการเทรด และอัพเดทล่าสุดเกี่ยวกับ EA ของเรา
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
                      {isLoading ? "กำลังส่งข้อมูล..." : "สมัครรับข่าวสาร"}
                    </Button>
                  </div>
                  
                  <p className="text-xs text-gray-500 text-center">
                    เราเคารพความเป็นส่วนตัวของคุณ และจะไม่เผยแพร่ข้อมูลของคุณให้บุคคลที่สาม
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
       
      </main>

      <Footer />
    </div>
  );
};

export default Index;
