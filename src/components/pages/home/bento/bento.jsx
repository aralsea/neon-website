import Image from 'next/image';

import Container from 'components/shared/container';
import RiveAnimation from 'components/shared/rive-animation';
import regionsImage from 'images/pages/home/bento/regions.jpg';
import timerImage from 'images/pages/home/bento/timer.jpg';

const Bento = () => (
  <section className="bento safe-paddings mt-16 xl:mt-10 lg:mt-9">
    <Container className="xl:max-w-[704px] lg:max-w-full" size="960">
      <h2 className="text-[68px] font-medium leading-[0.9] tracking-extra-tight text-white xl:text-[56px] lg:pl-16 lg:text-[44px] sm:pl-0 sm:text-[32px]">
        Better database.
        <br />
        For&nbsp;modern workflows.
      </h2>
      <div className="mt-10 grid grid-cols-2 gap-5 xl:mt-9 xl:gap-4 lg:mt-8 sm:mt-5 sm:gap-x-[18px]">
        <div className="relative col-span-2 grid min-h-[384px] grid-cols-1 grid-rows-1 overflow-hidden rounded-[10px] xl:min-h-[282px] lg:aspect-[2.5] lg:min-h-min sm:min-h-[250px] sm:w-full">
          <div className="relative z-10 col-span-full row-span-full">
            <Image
              className="absolute inset-0 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:h-full sm:w-auto sm:max-w-none sm:-translate-x-1/2 sm:-translate-y-1/2"
              src={regionsImage}
              width={960}
              height={384}
              alt=""
            />
          </div>
          <div className="pointer-events-none relative z-20 col-span-full row-span-full flex items-end px-6 pb-7 xl:px-5 xl:pb-6 sm:p-4">
            <p className="pointer-events-auto max-w-lg text-lg font-light leading-snug tracking-extra-tight text-white/60 xl:max-w-[412px] xl:text-base sm:leading-tight">
              <strong className="font-medium text-white">
                Read replicas available in 6 regions.
              </strong>{' '}
              Compute scales scales dynamically to ensure you&apos;re ready for peak hours.
            </p>
          </div>
          <div
            className="border-linear pointer-events-none absolute inset-0 z-10 rounded-[inherit] border-image-home-bento-regions-border"
            aria-hidden
          />
        </div>
        <div className="relative grid min-h-[491px] grid-cols-1 grid-rows-1 overflow-hidden rounded-[10px] xl:min-h-[360px] lg:aspect-[0.9572] md:min-h-min sm:col-span-full sm:min-h-[250px]">
          <div className="relative z-10 col-span-full row-span-full">
            <RiveAnimation
              className="absolute inset-0 h-full w-full overflow-hidden rounded-[10px]"
              src="/animations/pages/home/api.riv"
              artboard="main"
              intersetionRootMargin="0px 0px 600px 0px"
              alignment="TopCenter"
              fit="FitWidth"
            />
          </div>
          <div className="pointer-events-none relative z-20 col-span-full row-span-full flex items-end px-6 pb-7 xl:px-5 xl:pb-6 sm:p-4">
            <p className="pointer-events-auto text-lg font-light leading-snug tracking-extra-tight text-white/60 xl:text-base sm:text-[15px] sm:leading-tight">
              <strong className="font-medium text-white">API and CLI at your disposal.</strong>{' '}
              Manage your database programmatically or from the terminal.
            </p>
          </div>
          <div
            className="border-linear pointer-events-none absolute inset-0 z-10 rounded-[inherit] border-image-home-bento-api-and-cli-border"
            aria-hidden
          />
        </div>
        <div className="relative grid min-h-[491px] grid-cols-1 grid-rows-1 overflow-hidden rounded-[10px] bg-home-bento-timer-border xl:min-h-[360px] lg:aspect-[0.9572] md:min-h-min sm:col-span-full sm:min-h-[250px]">
          <div className="relative z-10 col-span-full row-span-full">
            <Image
              className="absolute inset-0 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:h-full sm:w-auto sm:max-w-none sm:-translate-x-1/2 sm:-translate-y-1/2"
              src={timerImage}
              width={470}
              height={491}
              alt=""
            />
          </div>
          <div className="pointer-events-none relative z-20 col-span-full row-span-full flex items-end px-6 pb-7 xl:px-5 xl:pb-6 sm:p-4">
            <p className="pointer-events-auto text-lg font-light leading-snug tracking-extra-tight text-white/60 xl:text-base sm:text-[15px] sm:leading-tight">
              <strong className="font-medium text-white">Point-in-Time Recovery.</strong> Instant,
              up to 30 days, granularity down to the transaction or second.
            </p>
          </div>
          <div
            className="border-linear pointer-events-none absolute inset-0 z-10 rounded-[inherit] border-image-home-bento-timer-border"
            aria-hidden
          />
        </div>
      </div>
    </Container>
  </section>
);

export default Bento;
