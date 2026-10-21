import Script from "next/script";
import { Hero } from "@/components/hero/Hero";
import { Clients } from "@/components/sections/Clients";
import { Closing } from "@/components/sections/Closing";
import { Guarantee } from "@/components/sections/Guarantee";
import { HowWeDoItReveal } from "@/components/sections/HowWeDoItReveal";
// Influencer cards hidden for now -- re-enable when the network data is ready.
// import { NetworkCards } from "@/components/sections/NetworkCards";
import { OtherServices } from "@/components/sections/OtherServices";
import { Positioning } from "@/components/sections/Positioning";
import { ReelCarousel } from "@/components/sections/ReelCarousel";
import { Service } from "@/components/sections/Service";
import { ServiceSticky } from "@/components/sections/ServiceSticky";
import { site } from "@/content/site";

export default function Page() {
  return (
    <>
      {/* LeadConnector chat widget -- home page only. */}
      <Script
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="6ad8038d4e3a6a8f95be33f3"
        data-source="WEB_USER"
        strategy="lazyOnload"
      />
      <Hero />
      <Positioning />
      <Clients />
      <HowWeDoItReveal service={site.services[0]} />
      <Service service={site.services[0]} hideHeader>
        <ReelCarousel content={site.reels} />
      </Service>
      <ServiceSticky service={site.services[1]} />
      <Service service={site.services[1]} hideHeader>
        {/* Influencer cards hidden for now -- re-enable when the network data is ready. */}
        {/* <NetworkCards /> */}
        <ReelCarousel content={site.influencerReels} />
      </Service>
      <OtherServices />
      <Guarantee />
      <Closing />
    </>
  );
}
