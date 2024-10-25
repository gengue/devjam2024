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
  title: "Highlight your benefits",
  desc: "You can use this space to highlight your first benefit or a feature of your product. It can also contain an image or Illustration like in the example along with some bullet points.",
  image: benefitOneImg,
  bullets: [
    {
      title: "Understand your customers",
      desc: "Then explain the first point breifly in one or two lines.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Improve acquisition",
      desc: "Here you can add the next benefit point.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Drive customer retention",
      desc: "This will be your last bullet point in this section.",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Offer more benefits here",
  desc: "You can use this same layout with a flip image to highlight your rest of the benefits of your product. It can also contain an image or Illustration as above section along with some bullet points.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Mobile Responsive Template",
      desc: "Nextly is designed as a mobile first responsive template.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Powered by Next.js & TailwindCSS",
      desc: "This template is powered by latest technologies and tools.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Dark & Light Mode",
      desc: "Nextly comes with a zero-config light & dark mode. ",
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
        Testimonials is a great way to increase the brand trust and awareness.
        Use this section to highlight your popular customers.
      </SectionTitle>

      <Testimonials />
      <Cta />
    </Container>
  );
}
