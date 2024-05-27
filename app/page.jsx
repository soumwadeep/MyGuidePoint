import InstallApp from "@/components/InstallApp";
import Image from "next/image";
import home1 from "@/img/home1.webp";
import home2 from "@/img/home2.webp";
import home3 from "@/img/home3.webp";
import SignUpButton from "@/components/SignUpButton";
import ReadButton from "@/components/ReadButton";
import GoToTop from "@/components/GoToTop";

const Home = () => {
  return (
    <main>
      <div className="row">
        <div className="col-sm">
          <div className="outer">
            <div className="middle">
              <div className="inner">
                <h1 className="fw-semibold">Welcome to My Guide Point</h1>
                <p className="lh-lg">
                  Welcome to my blog! Here, you'll find a wide range of topics
                  that interest me and, hopefully, will interest you too. From
                  technology and science to lifestyle and travel, I aim to cover
                  it all. I believe that knowledge should be shared and that
                  everyone can learn something new every day. So, whether you're
                  looking to expand your horizons or just want to read something
                  interesting, you're in the right place.
                </p>
                <ReadButton />
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="outer">
            <div className="middle">
              <div className="inner">
                <Image
                  src={home1}
                  alt="home1"
                  placeholder="blur"
                  id="animateimg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <div className="outer">
            <div className="middle">
              <div className="inner">
                <Image
                  src={home2}
                  alt="home2"
                  placeholder="blur"
                  id="animateimg2"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="outer">
            <div className="middle">
              <div className="inner">
                <h1 className="fw-semibold">Discover and Explore</h1>
                <p className="lh-lg">
                  Each blog post is a deep dive into a specific topic. I take
                  the time to research and write thoughtfully to ensure that you
                  get accurate and engaging information. Whether you're curious
                  about the latest tech trends, want tips on improving your
                  daily life, or are looking for travel inspiration, you'll find
                  articles here that cater to your interests. My goal is to make
                  learning and exploring new ideas both fun and accessible for
                  everyone.
                </p>
                <InstallApp />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <div className="outer">
            <div className="middle">
              <div className="inner">
                <h1 className="fw-semibold">Join the Conversation</h1>
                <p className="lh-lg">
                  I love hearing from my readers! Your thoughts, questions, and
                  feedback are always welcome. Feel free to comment on any post
                  or reach out to me directly. Let's make this blog a place for
                  open dialogue and community. Together, we can explore new
                  ideas, share our experiences, and learn from each other. Thank
                  you for visiting, and I hope you enjoy reading my blog as much
                  as I enjoy writing it.
                </p>
                <SignUpButton />
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="outer">
            <div className="middle">
              <div className="inner">
                <Image
                  src={home3}
                  alt="home3"
                  placeholder="blur"
                  id="animateimg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <GoToTop goto="/" />
    </main>
  );
};

export default Home;
