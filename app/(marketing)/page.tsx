import { Hero } from "@/components/hero/Hero";
import { Clients } from "@/components/sections/Clients";
import { Closing } from "@/components/sections/Closing";
import { Guarantee } from "@/components/sections/Guarantee";
// Influencer cards hidden for now -- re-enable when the network data is ready.
// import { NetworkCards } from "@/components/sections/NetworkCards";
import { Positioning } from "@/components/sections/Positioning";
import { ReelCarousel } from "@/components/sections/ReelCarousel";
import { Service } from "@/components/sections/Service";
import { site } from "@/content/site";

export default function Page() {
  return (
    <>
      <Hero />
      <Positioning />
      <Service service={site.services[0]}>
        <ReelCarousel />
      </Service>
      <Service service={site.services[1]}>
        {/* Influencer cards hidden for now -- re-enable when the network data is ready. */}
        {/* <NetworkCards /> */}
      </Service>
      <Guarantee />
      <Clients />
      <Closing />
    </>
  );
}
