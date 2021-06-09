import Logo from '../components/Logo';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { mixins } from '../styles';
import { ReactComponent as Illust } from '../images/undraw_Calendar_re_ki49.svg';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

const StyledAbout = styled.div`
  min-height: 100vh;
  ${mixins.flexCenter}

  .about-inner {
    color: var(--text-inverse);
    padding: 3rem 1rem 0;
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr minmax(260px, 3fr);
    grid-template-rows: auto auto 6rem auto;
    max-width: 700px;
    margin: 0 auto;

    .wiki {
      grid-column: 1 / 3;
      grid-row: 1 / 2;
      margin-bottom: 2rem;
      h2 {
        font-family: serif;
      }
      blockquote {
        padding-left: 1rem;
      }
      figcaption {
        padding-left: 3rem;
      }
      ${mixins.fadeIn}
    }
    .what-is {
      grid-column: 2 / 4;
      grid-row: 2 / 3;
      font-size: 1.25rem;
      .Logo {
        opacity: 0;
        animation: fade-left 0.7s var(--timing-spring) forwards;
        animation-delay: 0.5s;
      }
      p {
        margin-top: 1em;
        opacity: 0;
        animation: unfold 0.5s var(--timing-spring) forwards;
        animation-delay: 1s;
      }
    }
    .back-to-main {
      grid-column: 1 / -1;
      grid-row: 3 / 4;
      place-self: center;
      ${mixins.fadeIn}
    }
    .illust-container {
      grid-column: 1 / -1;
      grid-row: 4 / 5;
      place-self: center;

      // make illustration overlap on footer
      position: relative;
      top: 2rem;
      right: Min(Max(0px, 3vw), 5rem);

      svg {
        width: Min(Max(300px, 50vw), 600px);
        height: Min(Max(280px, 30vw), 400px);
        filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.5));
      }

      animation: mid-air 4s infinite ease-in-out;
    }
  }
`;

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
      <StyledAbout>
        <div className="about-inner">
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
      </StyledAbout>
      <Footer />
    </>
  );
}

export default About;
