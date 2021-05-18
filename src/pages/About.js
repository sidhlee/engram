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
          is a personal tracking system for online learning resources. Use
          Engram to bookmark your favorite articles and tutorials, rate them and
          create a side note. You'll have a deeper understanding of the topic
          each time you revisit them. 💪 🧠 💡 <br />
          No more losing track of countless read-later links!
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