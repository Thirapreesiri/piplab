
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const formSchema = z.object({
  name: z.string().min(2, { message: "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร" }),
  email: z.string().email({ message: "อีเมลไม่ถูกต้อง" }),
  subject: z.string().min(5, { message: "หัวข้อต้องมีอย่างน้อย 5 ตัวอักษร" }),
  message: z.string().min(10, { message: "ข้อความต้องมีอย่างน้อย 10 ตัวอักษร" }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", data);
      toast.success("ส่งข้อความเรียบร้อยแล้ว เราจะติดต่อกลับโดยเร็วที่สุด");
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-12">
        <title>ติดต่อเรา | EA Wizard</title>
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-center">ติดต่อเรา</h1>
          <p className="text-muted-foreground text-center mb-12">
            มีคำถามหรือต้องการความช่วยเหลือ? ติดต่อทีมงานของเราได้ทันที เรายินดีให้บริการคุณ
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="mx-auto bg-brand-blue/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-brand-blue" />
                </div>
                <CardTitle className="mt-4">อีเมล</CardTitle>
              </CardHeader>
              <CardContent>
                <a href="mailto:contact@eawizard.com" className="text-brand-blue hover:underline">
                  contact@eawizard.com
                </a>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="mx-auto bg-brand-blue/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                  <Phone className="h-8 w-8 text-brand-blue" />
                </div>
                <CardTitle className="mt-4">โทรศัพท์</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-brand-blue">02-123-4567</p>
                <p className="text-muted-foreground text-sm">จันทร์-ศุกร์: 9:00-18:00 น.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="mx-auto bg-brand-blue/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-brand-blue" />
                </div>
                <CardTitle className="mt-4">ที่อยู่</CardTitle>
              </CardHeader>
              <CardContent>
                <p>123 ถนนสุขุมวิท</p>
                <p>กรุงเทพมหานคร 10110</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-6 w-6 mr-2 text-brand-blue" /> 
                ส่งข้อความถึงเรา
              </CardTitle>
              <CardDescription>
                กรอกแบบฟอร์มด้านล่างเพื่อส่งข้อความถึงทีมงานของเรา เราจะติดต่อกลับโดยเร็วที่สุด
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ชื่อ-นามสกุล</FormLabel>
                          <FormControl>
                            <Input placeholder="กรอกชื่อ-นามสกุล" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>อีเมล</FormLabel>
                          <FormControl>
                            <Input placeholder="กรอกอีเมล" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>หัวข้อ</FormLabel>
                        <FormControl>
                          <Input placeholder="หัวข้อที่ต้องการติดต่อ" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ข้อความ</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="รายละเอียดที่ต้องการติดต่อ" 
                            className="min-h-[150px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <CardFooter className="px-0 pt-4">
                    <Button 
                      type="submit" 
                      className="w-full md:w-auto md:ml-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "กำลังส่ง..." : "ส่งข้อความ"}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <div className="rounded-lg overflow-hidden h-[400px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.544882285081!2d100.56324707454559!3d13.740293497798638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ee109dab6e1%3A0xfd15aa1c632d9677!2sSukhumvit%20Road%2C%20Khlong%20Toei%2C%20Bangkok!5e0!3m2!1sen!2sth!4v1683689913729!5m2!1sen!2sth" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
