// Router for the repair hub pages (lazy-loaded from App):
//   /search?q=                      universal search
//   /device/:slug                   universal device page (any device)
//   /components, /components/:id    component pages (any part number)
//   /answers, /answers/ask, /answers/q/:id
//   /teardowns
//   /contributors
//   /guides/new, /guides/edit/:id, /guides/view/:id
import { usePathname } from '../../hooks/usePathname';
import GlobalSearch from './GlobalSearch';
import DevicePage from './DevicePage';
import ComponentsHub from './ComponentsHub';
import Answers from './Answers';
import CommunityGuides from './CommunityGuides';
import Contributors from './Contributors';
import GuideEditor from './GuideEditor';
import GuideView from './GuideView';

export default function HubRoutes({ onOpenAuth }: { onOpenAuth?: () => void }) {
  const { pathname } = usePathname();
  const seg = pathname.split('/')[1] || '';
  if (seg === 'search') return <GlobalSearch onOpenAuth={onOpenAuth} />;
  if (seg === 'device') return <DevicePage onOpenAuth={onOpenAuth} />;
  if (seg === 'components') return <ComponentsHub onOpenAuth={onOpenAuth} />;
  if (seg === 'answers') return <Answers onOpenAuth={onOpenAuth} />;
  if (seg === 'teardowns') return <CommunityGuides teardownsOnly />;
  if (seg === 'contributors') return <Contributors />;
  if (pathname.startsWith('/guides/new') || pathname.startsWith('/guides/edit/')) return <GuideEditor onOpenAuth={onOpenAuth} />;
  if (pathname.startsWith('/guides/view/')) return <GuideView onOpenAuth={onOpenAuth} />;
  return <CommunityGuides embedded />;
}

