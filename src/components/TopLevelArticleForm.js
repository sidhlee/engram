import { useState } from 'react';
import styled from 'styled-components';
import { mq } from '../styles';
import { FaPlus } from 'react-icons/fa';
import ArticleForm from './Article/ArticleForm';
import BgOverlay from './BgOverlay';

const StyledTopLevelArticleForm = styled.div`
  .TopLevelArticleForm {
    position: fixed;
    right: calc(var(--top-form-toggler-size) + var(--px));
    bottom: calc(var(--top-form-toggler-size) + var(--px));
    max-width: 400px;
    --btn-size: 4.5rem;
    z-index: var(--z-TopLevelArticleForm);

    will-change: transform;
    transform-origin: bottom right;
    transition: transform 200ms ease, opacity 200ms ease;
    &.hidden {
      transform: scale(0);
      opacity: 0;
    }

    @media (max-width: ${mq.mobile}px) {
      min-width: initial;
      width: calc(100% - 2 * var(--px));
      left: 50%;
      bottom: 50vh;
      transform: translate3d(-50%, 50%, 0);

      &.hidden {
        transform: translate3d(-50%, 75%, 0);
        opacity: 0;
        pointer-events: none;
      }
    }
  }

  .top-form-toggle {
    position: fixed;
    right: var(--px);
    bottom: 3rem;
    width: var(--top-form-toggler-size);
    height: var(--top-form-toggler-size);
    padding: 1rem;
    background: var(--cl-blue);
    border-radius: 50%;
    z-index: var(--z-form-toggle);
    transition: all 150ms ease;
    svg {
      width: 100%;
      height: 100%;
      fill: var(--cl-white);
    }
    &.close-form {
      transform: rotate(45deg);
    }
    &:hover {
      background: var(--cl-blue-dark);
    }
  }
`;

const TopLevelArticleForm = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <StyledTopLevelArticleForm>
        <ArticleForm
          className={`TopLevelArticleForm shadow ${show ? '' : 'hidden'}`}
          closeForm={() => setShow(false)}
        />
        <button
          className={`top-form-toggle shadow${show ? ' close-form' : ''}`}
          onClick={() => setShow((show) => !show)}
        >
          <FaPlus aria-label="add article" />
        </button>
      </StyledTopLevelArticleForm>

      <BgOverlay show={show} onClick={() => setShow(false)} />
    </>
  );
};

export default TopLevelArticleForm;
