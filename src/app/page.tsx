import { Container } from "@/components/container";
import { Hero } from "@/components/hero";
import { SectionTitle } from "@/components/section-title";
import { Benefits } from "@/components/benefits";
import { Testimonials } from "@/components/testimonials";
import { Cta } from "@/components/cta";
import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import benefitOneImg from "../../public/img/benefit-one.png";
import benefitTwoImg from "../../public/img/benefit-two.png";

const benefitOne = {
  title: "Benefits",
  desc: "You can use this space to highlight your first benefit or a feature of your product. It can also contain an image or Illustration like in the example along with some bullet points.",
  image: benefitOneImg,
  bullets: [
    {
      title: "Your Adventure, On Demand",
      desc: "From short hops to full-day escapes, enjoy flexible, on-demand boat rides tailored to your schedule.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Trusted Local Captains",
      desc: "Our community of experienced boat operators ensures you a safe and enjoyable journey every time.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Discover More with Ease",
      desc: "Discover Colombia’s coast from a unique perspective. Book your ride today and start your next ocean adventure!",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};

const benefitTwo = {
  title: "And More",
  desc: "",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Flexible Scheduling:",
      desc: "Book rides at any time that suits you, with instant access to a range of local boat providers.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Wide Range of Options",
      desc: "From small fishing boats to luxury yachts, choose the vessel that fits your adventure.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Support Local Communities",
      desc: "Connect directly with local captains and help support the local economy with each trip.",
      icon: <SunIcon />,
    },
  ],
};

export default async function Home() {
  const { userId } = auth()

  if (userId) {
    if (userId === 'user_2nwG70hg9e4mDYqou0vrHlJdaTJ') {
      revalidatePath('/app/p') // Update cached posts
      redirect(`/app/p`)
    } else {
      revalidatePath('/app/') // Update cached posts
      redirect(`/app/`)
    }

  }
  return (
    <Container>
      <Hero />
      <SectionTitle
        preTitle="BoatHub Benefits"
        title="Why Choose BoatHub?"
      >
        BoatHub lets you explore Colombia’s coast with ease. Connect with local captains, choose from fishing boats to luxury yachts, and book your ride on your schedule. Plus, help protect our oceans with an optional 5% donation for marine conservation.
      </SectionTitle>

      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />

      <SectionTitle
        preTitle="Testimonials"
        title="Here's what our customers said"
      >
      </SectionTitle>

      <Testimonials />
      <Cta />
    </Container>
  );
}
