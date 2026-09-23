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
