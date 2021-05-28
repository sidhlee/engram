import Logo from '../components/Logo';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Illust } from '../images/undraw_Calendar_re_ki49.svg';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

function About() {
  // https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
  const { pathname } = useLocation();
  // Scroll to top when navigated
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Helmet>
        <title>Engram | About</title>
      </Helmet>
      <div className="about-wrapper">
        <div className={`About`}>
          <div className="wiki">
            <h2>Engram (neuropsychology)</h2>
            <figure>
              <blockquote cite="https://en.wikipedia.org/wiki/Engram_(neuropsychology)">
                <p>
                  An <strong>engram</strong> is a unit of cognitive information
                  imprinted in a physical substance, theorized to be the means
                  by which memories are stored as biophysical or biochemical
                  changes in the brain or other biological tissue, in response
                  to external stimuli.
                </p>
              </blockquote>
              <figcaption>
                -<cite>Wikipedia</cite>
              </figcaption>
            </figure>
          </div>
          <div className="what-is">
            <h1>
              <Link to="/">
                <Logo />
              </Link>
            </h1>
            <p>
              is a personal tracking system for online learning resources. Use
              Engram to bookmark your favorite articles and tutorials, rate them
              and create a side note. You'll have a deeper understanding of the
              topic each time you revisit them.{' '}
              <span rol="image" aria-label="strong brain lightbulb">
                💪&nbsp;🧠&nbsp;💡
              </span>
              <br />
              No more losing track of countless read-later links!
            </p>
          </div>
          <div className="back-to-main">
            <Link className="button-bg" to="/">
              Back to Engram
            </Link>
          </div>
          <div className="illust-container">
            {/* Source: undraw.co */}
            <Illust
              className="illust"
              aria-label="a woman adding article to engram"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
