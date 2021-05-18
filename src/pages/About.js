import React from 'react';
import Logo from '../components/Logo';
import { Link } from 'react-router-dom';
import { ReactComponent as Illust } from '../images/undraw_Calendar_re_ki49.svg';

function About() {
  return (
    <div className={`About`}>
      <div className="wiki">
        <h2>Engram (neuropsychology)</h2>
        <blockquote cite="https://en.wikipedia.org/wiki/Engram_(neuropsychology)">
          <p>
            An <strong>engram</strong> is a unit of cognitive information
            imprinted in a physical substance, theorized to be the means by
            which memories are stored as biophysical or biochemical changes in
            the brain or other biological tissue, in response to external
            stimuli.
          </p>
        </blockquote>
        <figcaption>
          -<cite>Wikipedia</cite>
        </figcaption>
      </div>
      <div className="what-is">
        <Logo />
        <p>
          is a personal tracking system for online learning resources. You can
          use Engram to bookmark your favorite articles and tutorials, rate them
          and record how many times you visited them. Your understanding of the
          topic will become stronger with each repetition. No more losing track
          of countless read-later bookmarks!
        </p>
      </div>
      <div className="back-to-main">
        <Link className="button-bg" to="/">
          Back to Engram
        </Link>
      </div>
      <div className="illust-container">
        <Illust className="illust" />
      </div>
    </div>
  );
}

export default About;
