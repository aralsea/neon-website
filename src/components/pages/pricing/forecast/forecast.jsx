'use client';

import useScrollPosition from '@react-hook/window-scroll';
import { Alignment, Fit, Layout, useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import Container from 'components/shared/container/container';
import Link from 'components/shared/link';
import LINKS from 'constants/links';
import { activities, performance, storage } from 'constants/pricing';
import useWindowSize from 'hooks/use-window-size';
import ArrowIcon from 'icons/arrow-sm.inline.svg';

import Metrics from './metrics';

const SECTION_MIN_HEIGHT = 760;
const PAGE_MIN_HEIGHT = 800;
const OFFSET = 100;

const PAGE_HEIGHT_SETTINGS = [
  [975, 0.6, 0],
  [1200, 0.55, 200],
  [1600, 0.5, 300],
  [1900, 0.45, 400],
  [2200, 0.4, 500],
  [Number.MAX_SAFE_INTEGER, 0.35, 600],
];

const getSelectedIndex = (activeTitle, items) =>
  items.findIndex(({ title }) => title === activeTitle) + 1;

const Forecast = () => {
  const sectionRef = useRef();
  const { height: pageHeight } = useWindowSize();
  const scrollY = useScrollPosition();
  const [contentRef, isContentInView] = useInView({ triggerOnce: true });

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const [activeItems, setActiveItems] = useState({
    activity: activities[0],
    performance: performance[0],
    storage: storage[0],
  });

  const { RiveComponent, rive } = useRive({
    src: '/animations/pages/pricing/lights.riv',
    autoplay: false,
    stateMachines: 'SM',
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.Center,
    }),
  });

  const defaultInputName = useMemo(
    () => (currentSectionIndex === 3 ? 3 : currentSectionIndex + 1),
    [currentSectionIndex]
  );

  const animationStageInput = useStateMachineInput(rive, 'SM', 'stages', defaultInputName);
  const firstSelectInput = useStateMachineInput(rive, 'SM', '1 select', 1);
  const secondSelectInput = useStateMachineInput(rive, 'SM', '2 select', 1);
  const thirdSelectInput = useStateMachineInput(rive, 'SM', '3 select', 1);

  useEffect(() => {
    if (rive && isContentInView) {
      rive.play();
    }
  }, [rive, isContentInView]);

  useEffect(() => {
    if (!animationStageInput) return;
    if (currentSectionIndex === 3) {
      animationStageInput.value = 3;
    } else {
      animationStageInput.value = currentSectionIndex + 1;
    }

    if (!firstSelectInput) return;
    firstSelectInput.value = getSelectedIndex(activeItems.activity.title, activities);

    if (!secondSelectInput) return;
    secondSelectInput.value = getSelectedIndex(activeItems.performance.title, performance);

    if (!thirdSelectInput) return;
    thirdSelectInput.value = getSelectedIndex(activeItems.storage.title, storage);
  }, [
    currentSectionIndex,
    animationStageInput,
    firstSelectInput,
    secondSelectInput,
    thirdSelectInput,
    activeItems.activity.title,
    activeItems.performance.title,
    activeItems.storage.title,
  ]);

  const pageHeightMultiplier = useMemo(() => {
    const setting = PAGE_HEIGHT_SETTINGS.find(([threshold]) => pageHeight <= threshold);

    return setting ? setting[1] : PAGE_HEIGHT_SETTINGS[PAGE_HEIGHT_SETTINGS.length - 1][1];
  }, [pageHeight]);

  const switchPointsOffset = useMemo(() => {
    const setting = PAGE_HEIGHT_SETTINGS.find(([threshold]) => pageHeight <= threshold);

    return setting ? setting[2] : 0;
  }, [pageHeight]);

  useEffect(() => {
    const currentScrollTop = scrollY;
    const switchPointMultiplier =
      pageHeight < PAGE_MIN_HEIGHT ? SECTION_MIN_HEIGHT * 1 : pageHeight * pageHeightMultiplier;

    // 5 is number of sections: 4 + 1
    const switchPoints = [...Array(5)].map(
      (_, index) =>
        sectionRef.current.offsetTop + OFFSET + index * switchPointMultiplier - switchPointsOffset
    );

    switchPoints.forEach((_, index) => {
      if (currentScrollTop > switchPoints[index] && currentScrollTop < switchPoints[index + 1]) {
        setCurrentSectionIndex(index);
      }
    });
  }, [switchPointsOffset, pageHeight, pageHeightMultiplier, scrollY]);

  return (
    <section
      className="forecast safe-paddings pt-[200px] 2xl:pt-36 md:pt-24 md:pb-20"
      ref={sectionRef}
    >
      <Container
        className="relative z-10 grid grid-cols-12 gap-x-10 xl:gap-x-6 lg:gap-x-4 md:grid-cols-1"
        size="medium"
      >
        <div className="col-start-2 col-span-5 -mr-10 xl:col-start-1 xl:col-span-6 xl:mr-0 md:col-span-full">
          <h2 className="text-6xl leading-none font-medium tracking-tighter 2xl:text-[60px] xl:text-[56px] lg:text-5xl md:text-4xl">
            3-click bill estimate
          </h2>
          <p className="text-lg leading-snug font-light mt-4 max-w-[464px] md:text-base md:max-w-none">
            Forecast your monthly bill by answering questions about user activity and app needs.
          </p>
        </div>
        <div className="col-end-12 col-span-4 -ml-10 md:col-span-full md:ml-0">
          <div>
            <p className="text-lg leading-snug font-light mt-4 max-w-[248px] md:text-base md:max-w-none">
              Need additional help or custom volume-based plans?
            </p>
            <Link
              className="mt-3.5 pt-[7px] pb-2 px-3 text-[15px] border border-green-45 rounded-[50px] inline-flex items-baseline leading-none text-green-45 tracking-extra-tight transition-colors duration-200 hover:border-[#00e5bf] hover:text-[#00e5bf]"
              to={LINKS.contactSales}
            >
              Contact Sales
              <ArrowIcon className="ml-1" />
            </Link>
          </div>
        </div>
      </Container>
      <Container
        className="grid grid-cols-12 gap-x-10 xl:gap-x-6 lg:gap-x-4 md:grid-cols-1"
        size="medium"
      >
        <div className="relative col-span-5 -mx-[140px] col-start-2 h-full xl:col-span-6 xl:col-start-1 xl:-mx-24 md:col-span-full md:hidden">
          <div className="sticky top-0 h-screen min-h-[700px] -mt-[20vh] [@media(max-height:900px)]:-mt-[10vh] [@media(min-height:1800px)]:-mt-[30vh]">
            <div className="absolute flex h-full w-full items-center justify-center">
              <RiveComponent width={870} height={767} aria-hidden />
            </div>
          </div>
        </div>
        <div
          className="relative col-end-12 col-span-4 -ml-10 z-10 xl:col-end-13 xl:col-span-5 md:col-span-full md:ml-0"
          ref={contentRef}
        >
          <Metrics
            currentSectionIndex={currentSectionIndex}
            activeItems={activeItems}
            setActiveItems={setActiveItems}
          />
        </div>
      </Container>
    </section>
  );
};

export default Forecast;
