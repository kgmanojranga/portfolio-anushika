import Container from '../components/common/Container';
import Hero from '../components/home/Hero';
import WhatIDo from '../components/home/WhatIDo';
import Experience from '../components/home/Experience';
import EducationCerts from '../components/home/EducationCerts';
import ContactStrip from '../components/home/ContactStrip';
import { profile } from '../data/profile';

const HomePage = () => {
  return (
    <>
      <Hero personal={profile.personal} />
      <WhatIDo focusAreas={profile.focusAreas} />
      <Container>
        <Experience experience={profile.experience} />
        <EducationCerts
          education={profile.education}
          certifications={profile.certifications}
        />
        <ContactStrip />
      </Container>
    </>
  );
};

export default HomePage;
