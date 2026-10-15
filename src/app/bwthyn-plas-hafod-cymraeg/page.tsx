import WelshHomePage, { metadata as welshMetadata } from '../cy/page';

export const instant = false;
export const metadata = welshMetadata;


export default function BwthynPlasHafodCymraegRoute() {
  return <WelshHomePage />;
}
