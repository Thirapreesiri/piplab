interface SiteConfig {
  title: string;
  description: string;
  bannerImage: string;
  lineUrl: string;
  aiGeneratorImage: string;
  brokerImage: string;
  brokerSignupText: string;
  brokerSignupUrl: string;
  webhookUrl: string;
  logoText: string;
  footerLogoText: string;
  footerCopyright: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  eaCopyright: string;
  eaWebsite: string;
}

const siteConfig: SiteConfig = {
  title: "NoCode FXBot - สร้าง EA แบบ No Code และใช้ AI สร้าง EA",
  description: "สร้าง Expert Advisor (EA) สำหรับ Forex Trading แบบ No Code ด้วย AI ที่ช่วยให้คุณสร้าง EA ได้อย่างง่ายดาย",
  bannerImage: "/img/fx5.png",
  lineUrl: "https://line.me/ti/p/~@yourlineaccount",
  aiGeneratorImage: "/img/fx4.png",
  brokerImage: "/img/fx5.png",
  brokerSignupText: "สมัครสมาชิกตอนนี้",
  brokerSignupUrl: "https://www.xm.com/th/register",
  webhookUrl: "https://hook.eu1.make.com/yourwebhookid",
  logoText: "OooO 55 FX",
  footerLogoText: "NoCode FXBot",
  footerCopyright: " 2025 NoCode FXBot. สงวนลิขสิทธิ์.",
  contactAddress: "123 ถนนสุขุมวิท กรุงเทพมหานคร 10110",
  contactPhone: "02-123-4567",
  contactEmail: "contact@nocodefxbot.com",
  eaCopyright: "NoCode FXBot",
  eaWebsite: "https://www.nocodefxbot.com/"
};

export default siteConfig;
