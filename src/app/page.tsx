import {
  Age,
  Emphasis,
  Faded,
  GitHubMark,
  InlineImage,
  Intro,
  Mention,
  XMark,
} from '@/src/components/home/intro';
import { SiteContainer } from '@/src/components/layout/site-container';

const roblox = (id: string, slug: string) =>
  `https://www.roblox.com/communities/${id}/${slug}#!/about`;

export default function Home() {
  return (
    <div className="flex grow flex-col justify-center">
      <SiteContainer width={1300}>
        <SiteContainer.Content>
          <Intro>
            <h1 className="font-normal">
              Hey, I'm <Emphasis>Tim Ritter</Emphasis>, a <Age />
              -year-old designer, engineer <span className="font-ovo">&</span>{' '}
              game developer.
            </h1>
            <p>
              By day, I build the ERP software that powers the German housing
              market.
            </p>
            <p>
              At night, I work on <Faded>a multitude of</Faded> passion
              projects. Mostly{' '}
              <Mention href="https://roblox.com">
                <InlineImage src="/icons/roblox.png" />
                Roblox
              </Mention>{' '}
              games.
            </p>
            <p>
              In the past, I contributed to{' '}
              <Mention href="https://create.t3.gg">
                <InlineImage
                  light="/icons/t3-light-bg.svg"
                  dark="/icons/t3-dark-bg.svg"
                />
                Create T3 App
              </Mention>
              , and built{' '}
              <Mention href="https://github.com/Coyenn/iso">
                <GitHubMark />
                Iso
              </Mention>
              . I founded{' '}
              <Mention href={roblox('32385121', 'Luminary-Games')}>
                Luminary Games
              </Mention>
              , and{' '}
              <Mention href={roblox('34260095', 'Pixel-Pirates')}>
                Pixel Pirates
              </Mention>{' '}
              <Faded>together with my twin brother</Faded>.
            </p>
            <p>
              Feel free to say hi{' '}
              <Mention href="https://x.com/Kojenia">
                <XMark />
                @Kojenia
              </Mention>{' '}
              or at <Mention href="mailto:hi@tim.cv">hi@tim.cv</Mention>.
            </p>
          </Intro>
        </SiteContainer.Content>
      </SiteContainer>
    </div>
  );
}
