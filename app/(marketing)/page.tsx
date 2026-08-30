import { Hero } from "@/components/hero/Hero";
import { Clients } from "@/components/sections/Clients";
import { Closing } from "@/components/sections/Closing";
import { Guarantee } from "@/components/sections/Guarantee";
import { NetworkCards } from "@/components/sections/NetworkCards";
import { Positioning } from "@/components/sections/Positioning";
import { Service } from "@/components/sections/Service";
import { site } from "@/content/site";

export default function Page() {
  return (
    <>
      <Hero />
      <Positioning />
      <Service service={site.services[0]} />
      <Service service={site.services[1]}>
        <NetworkCards />
      </Service>
      <Guarantee />
      <Clients />
      <Closing />
    </>
  );
}
