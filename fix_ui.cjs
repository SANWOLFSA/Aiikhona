const fs = require('fs');

// 1. Add Wand2 to PhonesPage (it was missing from lucide-react import)
let phonesPage = fs.readFileSync('src/components/PhonesPage.tsx', 'utf-8');
phonesPage = phonesPage.replace('Sparkles, CheckCircle2, ChevronDown, Wrench }', 'Sparkles, CheckCircle2, ChevronDown, Wrench, Wand2 }');
fs.writeFileSync('src/components/PhonesPage.tsx', phonesPage);

// 2. Add to Navigation
let nav = fs.readFileSync('src/components/Navigation.tsx', 'utf-8');
nav = nav.replace("{ id: 'guides', label: 'Repair Guides', icon: BookOpen },", "{ id: 'phones', label: 'Phones Page', icon: Smartphone, highlight: true },\n    { id: 'guides', label: 'Repair Guides', icon: BookOpen },");
nav = nav.replace("import { BookOpen,", "import { Smartphone, BookOpen,");
fs.writeFileSync('src/components/Navigation.tsx', nav);

// 3. Add to App.tsx
let app = fs.readFileSync('src/App.tsx', 'utf-8');
app = app.replace("import RepairGuides", "import PhonesPage from './components/PhonesPage';\nimport RepairGuides");
app = app.replace("{activeTab === 'guides' && (", "{activeTab === 'phones' && <PhonesPage />}\n          {activeTab === 'guides' && (");
app = app.replace("const [activeTab, setActiveTab] = useState('guides');", "const [activeTab, setActiveTab] = useState('phones');");
fs.writeFileSync('src/App.tsx', app);

