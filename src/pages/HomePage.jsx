import Hero from '../components/Hero'
import Events from '../components/Events'
import Story from '../components/Story'
import GalleryPreview from '../components/GalleryPreview'
import PartyVibe from '../components/PartyVibe'
import VideoMoments from '../components/VideoMoments'
import SocialProof from '../components/SocialProof'
import FaqContact from '../components/FaqContact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Events />
      <Story />
      <GalleryPreview />
      <PartyVibe />
      <VideoMoments />
      <SocialProof />
      <FaqContact />
    </>
  )
}
