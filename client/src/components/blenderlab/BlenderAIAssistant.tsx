import React, { useState, useEffect, useRef, useCallback } from "react";

// ==================== TYPES ====================
type Language = "english" | "tamil" | "tanglish";
type HelpCategory = "modeling" | "materials" | "lighting" | "rendering" | "animation" | "troubleshooting" | "general";

interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  steps?: AIStep[];
  shortcuts?: string[];
}

interface AIStep {
  number: number;
  instruction: string;
  shortcut?: string;
  tip?: string;
}

interface QuickHelp {
  id: string;
  icon: string;
  label: string;
  labelTamil: string;
  labelTanglish: string;
  query: string;
}

interface ToolExplanation {
  name: string;
  shortcut: string;
  description: string;
  descriptionTamil: string;
  descriptionTanglish: string;
  usage: string;
}

interface TroubleshootingItem {
  problem: string;
  problemTamil: string;
  problemTanglish: string;
  solution: string;
  solutionTamil: string;
  solutionTanglish: string;
  steps: string[];
}

interface ContextSuggestion {
  context: string;
  suggestions: string[];
}

interface BlenderAIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  currentObject?: string;
  currentTool?: string;
  objectCount?: number;
  undoCount?: number;
  lastAction?: string;
  onSuggestionClick?: (suggestion: string) => void;
}

// ==================== KNOWLEDGE BASE ====================
const quickHelpOptions: QuickHelp[] = [
  { 
    id: "model", 
    icon: "📦", 
    label: "How to model objects", 
    labelTamil: "பொருட்களை எப்படி மாடல் செய்வது",
    labelTanglish: "Objects epdi model pannurathu",
    query: "How do I model objects in Blender?"
  },
  { 
    id: "materials", 
    icon: "🎨", 
    label: "How to add materials", 
    labelTamil: "மெட்டீரியல்களை எப்படி சேர்ப்பது",
    labelTanglish: "Materials epdi add pannurathu",
    query: "How do I add materials to my model?"
  },
  { 
    id: "lighting", 
    icon: "💡", 
    label: "How to add lighting", 
    labelTamil: "லைட்டிங் எப்படி சேர்ப்பது",
    labelTanglish: "Lighting epdi add pannurathu",
    query: "How do I add lighting to my scene?"
  },
  { 
    id: "render", 
    icon: "🎬", 
    label: "How to render scene", 
    labelTamil: "சீனை ரெண்டர் செய்வது எப்படி",
    labelTanglish: "Scene epdi render pannurathu",
    query: "How do I render my scene?"
  },
  { 
    id: "hollow", 
    icon: "🕳️", 
    label: "Make object hollow", 
    labelTamil: "பொருளை உள்ளீடாக்குவது",
    labelTanglish: "Object ah hollow pannurathu",
    query: "How do I make an object hollow like a cup?"
  },
  { 
    id: "smooth", 
    icon: "✨", 
    label: "Make edges smooth", 
    labelTamil: "விளிம்புகளை மென்மையாக்குவது",
    labelTanglish: "Edges ah smooth pannurathu",
    query: "How do I make my model edges smoother?"
  },
];

const toolExplanations: ToolExplanation[] = [
  {
    name: "Extrude",
    shortcut: "E",
    description: "Extends selected faces, edges, or vertices outward to create new geometry. Essential for creating complex shapes from simple ones.",
    descriptionTamil: "தேர்ந்தெடுக்கப்பட்ட முகங்கள், விளிம்புகள் அல்லது உச்சிகளை புதிய வடிவியல் உருவாக்க வெளிப்புறமாக நீட்டிக்கிறது.",
    descriptionTanglish: "Selected faces, edges, vertices ellam veliya extend panni pudhu geometry create pannum. Complex shapes pannurathu ku romba useful.",
    usage: "Select faces → Press E → Move mouse to extrude"
  },
  {
    name: "Inset",
    shortcut: "I",
    description: "Creates a smaller face inside the selected face. Perfect for adding detail or preparing for extrusion.",
    descriptionTamil: "தேர்ந்தெடுக்கப்பட்ட முகத்தின் உள்ளே ஒரு சிறிய முகத்தை உருவாக்குகிறது.",
    descriptionTanglish: "Selected face ulla oru smaller face create pannum. Details add pannurathu ku, extrude ku prepare pannurathu ku nalla irukkum.",
    usage: "Select face → Press I → Move mouse to inset"
  },
  {
    name: "Loop Cut",
    shortcut: "Ctrl + R",
    description: "Adds edge loops around your mesh. Great for adding more geometry for detailed modeling.",
    descriptionTamil: "உங்கள் மெஷ் சுற்றி எட்ஜ் லூப்களை சேர்க்கிறது.",
    descriptionTanglish: "Mesh sutthi edge loops add pannum. Detailed modeling ku more geometry add panna use pannum.",
    usage: "Press Ctrl+R → Hover over edge → Scroll to add loops → Click to confirm"
  },
  {
    name: "Bevel",
    shortcut: "Ctrl + B",
    description: "Rounds off edges to create smoother transitions. Makes models look more realistic.",
    descriptionTamil: "மென்மையான மாற்றங்களை உருவாக்க விளிம்புகளை வட்டமாக்குகிறது.",
    descriptionTanglish: "Edges ellam round off panni smoother transitions create pannum. Models ah realistic ah kaatturathu ku use pannum.",
    usage: "Select edges → Press Ctrl+B → Move mouse to adjust → Scroll for segments"
  },
  {
    name: "Subdivision Surface",
    shortcut: "Ctrl + 1/2/3",
    description: "A modifier that smooths your entire mesh by subdividing it. Higher levels = smoother surface.",
    descriptionTamil: "உங்கள் முழு மெஷையும் துணைப்பிரிவு செய்வதன் மூலம் மென்மையாக்கும் மாற்றி.",
    descriptionTanglish: "Whole mesh ah subdivide panni smooth pannum modifier. Higher levels = romba smooth surface.",
    usage: "Select object → Add Modifier → Subdivision Surface → Adjust level"
  },
  {
    name: "Scale",
    shortcut: "S",
    description: "Resizes selected objects or elements. Can scale uniformly or along specific axes.",
    descriptionTamil: "தேர்ந்தெடுக்கப்பட்ட பொருட்கள் அல்லது கூறுகளை மறுஅளவாக்குகிறது.",
    descriptionTanglish: "Selected objects ah resize pannum. Uniform ah scale pannalam illa specific axes la mattum scale pannalam.",
    usage: "Select → Press S → Move mouse / Press X/Y/Z for axis lock"
  },
  {
    name: "Rotate",
    shortcut: "R",
    description: "Rotates selected objects or elements around a pivot point.",
    descriptionTamil: "தேர்ந்தெடுக்கப்பட்ட பொருட்களை சுழற்றுகிறது.",
    descriptionTanglish: "Selected objects ah pivot point sutthi rotate pannum.",
    usage: "Select → Press R → Move mouse / Press X/Y/Z for axis"
  },
  {
    name: "Grab/Move",
    shortcut: "G",
    description: "Moves selected objects or elements in 3D space.",
    descriptionTamil: "3D வெளியில் தேர்ந்தெடுக்கப்பட்ட பொருட்களை நகர்த்துகிறது.",
    descriptionTanglish: "3D space la selected objects ah move pannum.",
    usage: "Select → Press G → Move mouse / Press X/Y/Z for axis lock"
  },
];

const troubleshootingGuide: TroubleshootingItem[] = [
  {
    problem: "Model looks broken or has holes",
    problemTamil: "மாடல் உடைந்தது போல் தெரிகிறது",
    problemTanglish: "Model broken ah theriyuthu, holes irukku",
    solution: "Check and fix normals, remove duplicate vertices",
    solutionTamil: "நார்மல்களை சரிபாருங்கள், டூப்ளிகேட் வெர்டிசஸ்களை அகற்றுங்கள்",
    solutionTanglish: "Normals check pannunga, duplicate vertices remove pannunga",
    steps: [
      "Select object → Enter Edit Mode (Tab)",
      "Select All (A)",
      "Mesh → Normals → Recalculate Outside (Shift+N)",
      "Mesh → Clean Up → Merge by Distance"
    ]
  },
  {
    problem: "Object looks too sharp/angular",
    problemTamil: "பொருள் மிகவும் கூர்மையாக/கோணமாக தெரிகிறது",
    problemTanglish: "Object romba sharp/angular ah theriyuthu",
    solution: "Add Subdivision Surface modifier and smooth shading",
    solutionTamil: "சப்டிவிஷன் சர்ஃபேஸ் மாடிஃபையர் சேர்த்து ஸ்மூத் ஷேடிங் செய்யுங்கள்",
    solutionTanglish: "Subdivision Surface modifier add panni smooth shading pannunga",
    steps: [
      "Select object",
      "Right-click → Shade Smooth",
      "Add Modifier → Subdivision Surface",
      "Adjust levels (1-3 recommended)"
    ]
  },
  {
    problem: "Can't see my object",
    problemTamil: "என் பொருளைப் பார்க்க முடியவில்லை",
    problemTanglish: "Object theriyala",
    solution: "Object might be hidden, too small, or camera is too far",
    solutionTamil: "பொருள் மறைக்கப்பட்டிருக்கலாம், மிகச்சிறியதாக இருக்கலாம், அல்லது கேமரா தொலைவில் இருக்கலாம்",
    solutionTanglish: "Object hidden irukkalam, romba small ah irukkalam, illana camera romba dooram irukkum",
    steps: [
      "Press Home to reset view",
      "Press . (numpad) to focus selected",
      "Check visibility in Outliner (eye icon)",
      "Press Alt+H to unhide all"
    ]
  },
  {
    problem: "Materials not showing",
    problemTamil: "மெட்டீரியல்கள் தெரியவில்லை",
    problemTanglish: "Materials kaanala",
    solution: "Switch to Material Preview or Rendered view mode",
    solutionTamil: "மெட்டீரியல் ப்ரிவ்யூ அல்லது ரெண்டர்ட் வ்யூ மோடுக்கு மாறுங்கள்",
    solutionTanglish: "Material Preview illa Rendered view mode ku change pannunga",
    steps: [
      "Press Z to open view modes",
      "Select 'Material Preview' or 'Rendered'",
      "Or click viewport shading buttons (top right)"
    ]
  },
  {
    problem: "Render is completely black",
    problemTamil: "ரெண்டர் முழுவதும் கருப்பாக உள்ளது",
    problemTanglish: "Render full black ah irukku",
    solution: "Add lights to your scene",
    solutionTamil: "உங்கள் சீனில் லைட்டுகளை சேர்க்கவும்",
    solutionTanglish: "Scene la lights add pannunga",
    steps: [
      "Press Shift+A → Light → Point/Sun/Area",
      "Position light above your objects",
      "Increase light strength in properties",
      "Try adding an HDRI for environment lighting"
    ]
  },
];

const contextSuggestions: ContextSuggestion[] = [
  {
    context: "cube",
    suggestions: [
      "Add loop cuts (Ctrl+R) to add more geometry",
      "Use bevel (Ctrl+B) for smoother edges",
      "Scale faces to create variations",
      "Extrude faces to create complex shapes"
    ]
  },
  {
    context: "sphere",
    suggestions: [
      "Use proportional editing (O) for organic shapes",
      "Try sculpting mode for detailed work",
      "Add subdivision for smoother surface",
      "Use grab tool in edit mode for deformations"
    ]
  },
  {
    context: "cylinder",
    suggestions: [
      "Great base for cups, bottles, pillars",
      "Inset top face and extrude down for hollow objects",
      "Add loop cuts for adding details",
      "Use bevel on edges for realistic look"
    ]
  },
  {
    context: "modeling",
    suggestions: [
      "Start with basic shapes and add details",
      "Use reference images (Shift+A → Image → Reference)",
      "Work from multiple viewports (Numpad 1, 3, 7)",
      "Keep topology clean with quads"
    ]
  },
  {
    context: "materials",
    suggestions: [
      "Use Principled BSDF for realistic materials",
      "Adjust roughness (0 = shiny, 1 = matte)",
      "Add textures for realistic surfaces",
      "Use node editor for complex materials"
    ]
  },
  {
    context: "lighting",
    suggestions: [
      "Use 3-point lighting for professional results",
      "Sun light for outdoor scenes",
      "Area lights for soft shadows",
      "HDRI backgrounds for realistic environment lighting"
    ]
  },
];

// Response templates for different queries
const responseTemplates: Record<string, { english: string; tamil: string; tanglish: string; steps: AIStep[] }> = {
  "hollow": {
    english: "Here's how to make an object hollow (like a cup):",
    tamil: "பொருளை உள்ளீடாக்குவது எப்படி (கப் போல):",
    tanglish: "Object ah hollow pannurathu epdi (cup maathiri):",
    steps: [
      { number: 1, instruction: "Select the object", shortcut: "Left Click", tip: "Make sure the object is selected (orange outline)" },
      { number: 2, instruction: "Enter Edit Mode", shortcut: "Tab", tip: "You'll see the mesh vertices and faces" },
      { number: 3, instruction: "Select the top face", shortcut: "Click face", tip: "In face select mode (3)" },
      { number: 4, instruction: "Inset the face", shortcut: "I", tip: "This creates a smaller face inside" },
      { number: 5, instruction: "Extrude downward", shortcut: "E then move down", tip: "Creates the hollow interior" },
      { number: 6, instruction: "Exit Edit Mode", shortcut: "Tab", tip: "Preview your hollow object" }
    ]
  },
  "lighting": {
    english: "Here's how to add lighting to your scene:",
    tamil: "உங்கள் சீனுக்கு லைட்டிங் எப்படி சேர்ப்பது:",
    tanglish: "Scene ku lighting epdi add pannurathu:",
    steps: [
      { number: 1, instruction: "Add a light", shortcut: "Shift + A → Light", tip: "Choose Point, Sun, Spot, or Area" },
      { number: 2, instruction: "Position the light", shortcut: "G", tip: "Move it above and to the side of your object" },
      { number: 3, instruction: "Adjust light strength", shortcut: "Properties Panel", tip: "Select light → Go to Light properties" },
      { number: 4, instruction: "Change light color if needed", shortcut: "Color picker in properties" },
      { number: 5, instruction: "Preview in Material mode", shortcut: "Z → Material Preview", tip: "See how lighting affects your scene" }
    ]
  },
  "materials": {
    english: "Here's how to add materials to your model:",
    tamil: "உங்கள் மாடலுக்கு மெட்டீரியல்கள் எப்படி சேர்ப்பது:",
    tanglish: "Model ku materials epdi add pannurathu:",
    steps: [
      { number: 1, instruction: "Select your object", shortcut: "Left Click" },
      { number: 2, instruction: "Go to Material Properties tab", shortcut: "Right panel → Material icon (sphere)", tip: "It's under the Properties panel" },
      { number: 3, instruction: "Click 'New' to create material" },
      { number: 4, instruction: "Adjust Base Color", shortcut: "Click color picker", tip: "Choose your desired color" },
      { number: 5, instruction: "Adjust Roughness", tip: "0 = shiny/reflective, 1 = matte/rough" },
      { number: 6, instruction: "Adjust Metallic if needed", tip: "1 for metal surfaces" }
    ]
  },
  "render": {
    english: "Here's how to render your scene:",
    tamil: "உங்கள் சீனை ரெண்டர் செய்வது எப்படி:",
    tanglish: "Scene epdi render pannurathu:",
    steps: [
      { number: 1, instruction: "Position your camera", shortcut: "Select Camera → G to move" },
      { number: 2, instruction: "Set render settings", shortcut: "Properties → Render tab" },
      { number: 3, instruction: "Choose render engine", tip: "Eevee (fast) or Cycles (realistic)" },
      { number: 4, instruction: "Set output resolution", shortcut: "Output Properties tab" },
      { number: 5, instruction: "Render image", shortcut: "F12", tip: "Wait for render to complete" },
      { number: 6, instruction: "Save rendered image", shortcut: "Image → Save As (Alt+S)" }
    ]
  },
  "smooth": {
    english: "Here's how to make your model edges smoother:",
    tamil: "உங்கள் மாடல் விளிம்புகளை மென்மையாக்குவது எப்படி:",
    tanglish: "Model edges ah smooth pannurathu epdi:",
    steps: [
      { number: 1, instruction: "Select your object", shortcut: "Left Click" },
      { number: 2, instruction: "Apply Smooth Shading", shortcut: "Right Click → Shade Smooth" },
      { number: 3, instruction: "Add Subdivision modifier", shortcut: "Ctrl + 2", tip: "Or via Add Modifier → Subdivision Surface" },
      { number: 4, instruction: "Adjust subdivision level", tip: "Level 2-3 is usually enough" },
      { number: 5, instruction: "Use Bevel for edge control", shortcut: "Ctrl + B in Edit Mode", tip: "Select edges first" }
    ]
  },
  "model": {
    english: "Here's basic modeling workflow:",
    tamil: "அடிப்படை மாடலிங் வழிமுறை:",
    tanglish: "Basic modeling workflow:",
    steps: [
      { number: 1, instruction: "Start with a primitive shape", shortcut: "Shift + A → Mesh", tip: "Choose closest shape to your object" },
      { number: 2, instruction: "Enter Edit Mode", shortcut: "Tab" },
      { number: 3, instruction: "Add geometry with Loop Cuts", shortcut: "Ctrl + R", tip: "Scroll to add more loops" },
      { number: 4, instruction: "Shape using Move, Scale, Rotate", shortcut: "G, S, R" },
      { number: 5, instruction: "Extrude for new geometry", shortcut: "E" },
      { number: 6, instruction: "Add details progressively", tip: "Work from large shapes to small details" }
    ]
  }
};

// ==================== MAIN COMPONENT ====================
const BlenderAIAssistant: React.FC<BlenderAIAssistantProps> = ({
  isOpen,
  onClose,
  currentObject,
  currentTool,
  objectCount = 1,
  undoCount = 0,
  lastAction,
  onSuggestionClick
}) => {
  // State
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [language, setLanguage] = useState<Language>("english");
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "tools" | "troubleshoot" | "tips">("chat");
  const [showSuggestions, setShowSuggestions] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Generate welcome message based on context
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeContent = getWelcomeMessage();
      setMessages([{
        id: "welcome",
        role: "assistant",
        content: welcomeContent,
        timestamp: new Date()
      }]);
    }
  }, [isOpen]);

  const getWelcomeMessage = () => {
    const greetings = {
      english: `👋 Hello! I'm your Blender AI Assistant. I can help you with modeling, materials, lighting, and more. Ask me anything!`,
      tamil: `👋 வணக்கம்! நான் உங்கள் பிளெண்டர் AI உதவியாளர். மாடலிங், மெட்டீரியல்கள், லைட்டிங் மற்றும் பலவற்றில் உதவ முடியும். எதையும் கேளுங்கள்!`,
      tanglish: `👋 Vanakkam! Naan unga Blender AI Assistant. Modeling, materials, lighting, ellathulayum help panna mudiyum. Ethavuthu kelunga!`
    };
    
    let contextHint = "";
    if (currentObject) {
      contextHint = language === "english" 
        ? `\n\n📍 I see you're working with a ${currentObject}. Need tips for modeling it?`
        : language === "tamil"
        ? `\n\n📍 நீங்கள் ${currentObject} உடன் வேலை செய்கிறீர்கள் என்று பார்க்கிறேன். அதை மாடலிங் செய்ய டிப்ஸ் வேண்டுமா?`
        : `\n\n📍 Neenga ${currentObject} oda work panringa nu paakaren. Athai model panna tips venum ah?`;
    }
    
    return greetings[language] + contextHint;
  };

  const getContextSuggestions = (): string[] => {
    if (!currentObject && !currentTool) {
      // General suggestions
      return contextSuggestions.find(c => c.context === "modeling")?.suggestions || [];
    }
    
    // Object-specific suggestions
    const objectType = currentObject?.toLowerCase();
    const found = contextSuggestions.find(c => 
      objectType?.includes(c.context) || c.context === objectType
    );
    
    return found?.suggestions || contextSuggestions.find(c => c.context === "modeling")?.suggestions || [];
  };

  const detectQueryIntent = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Check for hollow/cup-related queries
    if (lowerQuery.includes("hollow") || lowerQuery.includes("cup") || lowerQuery.includes("empty") ||
        lowerQuery.includes("உள்ளீடு") || lowerQuery.includes("கப்")) {
      return "hollow";
    }
    
    // Lighting queries
    if (lowerQuery.includes("light") || lowerQuery.includes("lamp") || lowerQuery.includes("lighting") ||
        lowerQuery.includes("லைட்") || lowerQuery.includes("விளக்கு")) {
      return "lighting";
    }
    
    // Material queries
    if (lowerQuery.includes("material") || lowerQuery.includes("color") || lowerQuery.includes("texture") ||
        lowerQuery.includes("மெட்டீரியல்") || lowerQuery.includes("நிறம்")) {
      return "materials";
    }
    
    // Render queries
    if (lowerQuery.includes("render") || lowerQuery.includes("export") || lowerQuery.includes("image") ||
        lowerQuery.includes("ரெண்டர்")) {
      return "render";
    }
    
    // Smooth queries
    if (lowerQuery.includes("smooth") || lowerQuery.includes("round") || lowerQuery.includes("soft") ||
        lowerQuery.includes("bevel") || lowerQuery.includes("subdivision") ||
        lowerQuery.includes("மென்மை") || lowerQuery.includes("smooth")) {
      return "smooth";
    }
    
    // Modeling queries
    if (lowerQuery.includes("model") || lowerQuery.includes("create") || lowerQuery.includes("make") ||
        lowerQuery.includes("மாடல்") || lowerQuery.includes("உருவாக்கு")) {
      return "model";
    }
    
    // Tool explanation queries
    const toolNames = toolExplanations.map(t => t.name.toLowerCase());
    for (const tool of toolNames) {
      if (lowerQuery.includes(tool) && (lowerQuery.includes("what") || lowerQuery.includes("explain") ||
          lowerQuery.includes("how") || lowerQuery.includes("என்ன") || lowerQuery.includes("epdi"))) {
        return `tool:${tool}`;
      }
    }
    
    return "general";
  };

  const generateResponse = (query: string): AIMessage => {
    const intent = detectQueryIntent(query);
    
    // Tool explanation
    if (intent.startsWith("tool:")) {
      const toolName = intent.split(":")[1];
      const tool = toolExplanations.find(t => t.name.toLowerCase() === toolName);
      
      if (tool) {
        const desc = language === "english" ? tool.description :
                     language === "tamil" ? tool.descriptionTamil : tool.descriptionTanglish;
        return {
          id: Date.now().toString(),
          role: "assistant",
          content: `**${tool.name}** (Shortcut: \`${tool.shortcut}\`)\n\n${desc}\n\n**How to use:** ${tool.usage}`,
          timestamp: new Date(),
          shortcuts: [tool.shortcut]
        };
      }
    }
    
    // Check response templates
    const template = responseTemplates[intent];
    if (template) {
      const intro = language === "english" ? template.english :
                    language === "tamil" ? template.tamil : template.tanglish;
      
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: intro,
        timestamp: new Date(),
        steps: template.steps,
        shortcuts: template.steps.filter(s => s.shortcut).map(s => s.shortcut!)
      };
    }
    
    // General response
    const generalResponses = {
      english: `I understand you're asking about "${query}". Here are some tips:\n\n1. Make sure you have the right object selected\n2. Check if you're in the correct mode (Object/Edit)\n3. Try the quick help buttons below for common tasks\n\nCan you be more specific about what you'd like to do?`,
      tamil: `"${query}" பற்றி கேட்கிறீர்கள் என்று புரிகிறது. சில டிப்ஸ்:\n\n1. சரியான பொருள் தேர்ந்தெடுக்கப்பட்டுள்ளதா என்று உறுதி செய்யுங்கள்\n2. சரியான மோடில் இருக்கிறீர்களா என்று பாருங்கள்\n3. கீழே உள்ள குயிக் ஹெல்ப் பட்டன்களை முயற்சிக்கவும்`,
      tanglish: `"${query}" pathi kekkuringa nu puriyuthu. Sila tips:\n\n1. Correct object select pannirukinga nu make sure pannunga\n2. Correct mode la irukinga nu parunga (Object/Edit)\n3. Keezha ulla quick help buttons try pannunga\n\nEnna specifically panna virumbureenganu sollunga?`
    };
    
    return {
      id: Date.now().toString(),
      role: "assistant",
      content: generalResponses[language],
      timestamp: new Date()
    };
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setShowSuggestions(false);
    
    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(inputValue);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 800);
  };

  const handleQuickHelp = (help: QuickHelp) => {
    const queryText = language === "english" ? help.label :
                      language === "tamil" ? help.labelTamil : help.labelTanglish;
    
    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: "user",
      content: queryText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setShowSuggestions(false);
    
    setTimeout(() => {
      const response = generateResponse(help.query);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 600);
  };

  const getQuickHelpLabel = (help: QuickHelp) => {
    return language === "english" ? help.label :
           language === "tamil" ? help.labelTamil : help.labelTanglish;
  };

  const getToolDescription = (tool: ToolExplanation) => {
    return language === "english" ? tool.description :
           language === "tamil" ? tool.descriptionTamil : tool.descriptionTanglish;
  };

  const getTroubleshootProblem = (item: TroubleshootingItem) => {
    return language === "english" ? item.problem :
           language === "tamil" ? item.problemTamil : item.problemTanglish;
  };

  const getTroubleshootSolution = (item: TroubleshootingItem) => {
    return language === "english" ? item.solution :
           language === "tamil" ? item.solutionTamil : item.solutionTanglish;
  };

  if (!isOpen) return null;

  return (
    <div className="absolute bottom-4 right-4 w-96 max-h-[600px] bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 flex flex-col overflow-hidden z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-xl">🤖</span>
          </div>
          <div>
            <h3 className="text-white font-bold">Blender AI Assistant</h3>
            <p className="text-white/80 text-xs">
              {language === "english" ? "Here to help!" : language === "tamil" ? "உதவ தயார்!" : "Help panna ready!"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="bg-white/20 text-white text-xs rounded px-2 py-1 border-0 outline-none"
          >
            <option value="english" className="text-gray-900">English</option>
            <option value="tamil" className="text-gray-900">தமிழ்</option>
            <option value="tanglish" className="text-gray-900">Tanglish</option>
          </select>
          <button onClick={onClose} className="text-white/80 hover:text-white text-lg">✕</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        {[
          { id: "chat" as const, label: "💬 Chat", labelTamil: "💬 அரட்டை" },
          { id: "tools" as const, label: "🔧 Tools", labelTamil: "🔧 கருவிகள்" },
          { id: "troubleshoot" as const, label: "🔍 Fix", labelTamil: "🔍 சரி" },
          { id: "tips" as const, label: "💡 Tips", labelTamil: "💡 டிப்ஸ்" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 text-xs font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-gray-700 text-white border-b-2 border-orange-500"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Chat Tab */}
        {activeTab === "chat" && (
          <div className="flex flex-col h-full">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                      message.role === "user"
                        ? "bg-orange-500 text-white rounded-br-md"
                        : "bg-gray-700 text-gray-100 rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    
                    {/* Steps */}
                    {message.steps && message.steps.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.steps.map(step => (
                          <div key={step.number} className="bg-gray-800/50 rounded-lg p-2">
                            <div className="flex items-start gap-2">
                              <span className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                {step.number}
                              </span>
                              <div className="flex-1">
                                <p className="text-sm font-medium">{step.instruction}</p>
                                {step.shortcut && (
                                  <code className="text-xs bg-gray-900 px-1.5 py-0.5 rounded text-orange-400 mt-1 inline-block">
                                    {step.shortcut}
                                  </code>
                                )}
                                {step.tip && (
                                  <p className="text-xs text-gray-400 mt-1">💡 {step.tip}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 rounded-2xl px-4 py-2 rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Help Buttons */}
            {showSuggestions && messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-gray-400 text-xs mb-2">
                  {language === "english" ? "Quick Help:" : language === "tamil" ? "விரைவு உதவி:" : "Quick Help:"}
                </p>
                <div className="flex flex-wrap gap-1">
                  {quickHelpOptions.slice(0, 4).map(help => (
                    <button
                      key={help.id}
                      onClick={() => handleQuickHelp(help)}
                      className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs hover:bg-gray-600 transition-colors"
                    >
                      {help.icon} {getQuickHelpLabel(help)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Context Suggestions */}
            {currentObject && showSuggestions && (
              <div className="px-4 pb-2 border-t border-gray-700 pt-2">
                <p className="text-gray-400 text-xs mb-2">
                  {language === "english" ? `Tips for ${currentObject}:` : `${currentObject} க்கான டிப்ஸ்:`}
                </p>
                <div className="space-y-1">
                  {getContextSuggestions().slice(0, 2).map((tip, i) => (
                    <button
                      key={i}
                      onClick={() => onSuggestionClick?.(tip)}
                      className="w-full text-left px-2 py-1.5 bg-gray-700/50 text-gray-300 rounded text-xs hover:bg-gray-700"
                    >
                      💡 {tip}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-gray-700">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={
                    language === "english" ? "Ask anything about Blender..." :
                    language === "tamil" ? "பிளெண்டர் பற்றி கேளுங்கள்..." :
                    "Blender pathi ethavuthu kelunga..."
                  }
                  className="flex-1 bg-gray-700 text-white text-sm px-4 py-2 rounded-full border border-gray-600 focus:border-orange-500 outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ➤
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tools Tab */}
        {activeTab === "tools" && (
          <div className="p-4 space-y-3">
            <p className="text-gray-400 text-xs mb-3">
              {language === "english" ? "Click any tool to learn more" :
               language === "tamil" ? "மேலும் அறிய ஏதேனும் கருவியை கிளிக் செய்யவும்" :
               "Tool pathi therinjukka click pannunga"}
            </p>
            {toolExplanations.map((tool, index) => (
              <div
                key={index}
                className="bg-gray-700 rounded-xl p-3 hover:bg-gray-600 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-medium text-sm">{tool.name}</span>
                  <code className="text-xs bg-gray-800 px-2 py-0.5 rounded text-orange-400">
                    {tool.shortcut}
                  </code>
                </div>
                <p className="text-gray-400 text-xs">{getToolDescription(tool)}</p>
                <p className="text-gray-500 text-xs mt-1">📝 {tool.usage}</p>
              </div>
            ))}
          </div>
        )}

        {/* Troubleshoot Tab */}
        {activeTab === "troubleshoot" && (
          <div className="p-4 space-y-3">
            <p className="text-gray-400 text-xs mb-3">
              {language === "english" ? "Common problems and solutions" :
               language === "tamil" ? "பொதுவான சிக்கல்கள் மற்றும் தீர்வுகள்" :
               "Common problems and solutions"}
            </p>
            {troubleshootingGuide.map((item, index) => (
              <div key={index} className="bg-gray-700 rounded-xl p-3">
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-red-400">❌</span>
                  <p className="text-white font-medium text-sm">{getTroubleshootProblem(item)}</p>
                </div>
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-green-400">✓</span>
                  <p className="text-gray-300 text-sm">{getTroubleshootSolution(item)}</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-2 mt-2">
                  <p className="text-gray-400 text-xs mb-1">Steps:</p>
                  {item.steps.map((step, i) => (
                    <p key={i} className="text-gray-300 text-xs">
                      {i + 1}. {step}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tips Tab */}
        {activeTab === "tips" && (
          <div className="p-4">
            <p className="text-gray-400 text-xs mb-3">
              {language === "english" ? "Pro tips to improve your skills" :
               language === "tamil" ? "உங்கள் திறன்களை மேம்படுத்த ப்ரோ டிப்ஸ்" :
               "Skills improve panna pro tips"}
            </p>
            
            {/* Keyboard Shortcuts */}
            <div className="mb-4">
              <h4 className="text-white font-medium text-sm mb-2">⌨️ Essential Shortcuts</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: "G", action: "Move" },
                  { key: "R", action: "Rotate" },
                  { key: "S", action: "Scale" },
                  { key: "E", action: "Extrude" },
                  { key: "I", action: "Inset" },
                  { key: "Tab", action: "Edit Mode" },
                  { key: "Ctrl+R", action: "Loop Cut" },
                  { key: "Ctrl+B", action: "Bevel" },
                ].map((shortcut, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-700 rounded px-2 py-1.5">
                    <code className="text-orange-400 text-xs">{shortcut.key}</code>
                    <span className="text-gray-300 text-xs">{shortcut.action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Workflow Tips */}
            <div className="mb-4">
              <h4 className="text-white font-medium text-sm mb-2">💡 Workflow Tips</h4>
              <div className="space-y-2">
                {[
                  "Use reference images (Shift+A → Image → Reference)",
                  "Work from multiple viewports - press Numpad 1, 3, 7",
                  "Save versions often - Ctrl+S",
                  "Use modifiers before applying them",
                  "Keep mesh topology clean - use quads",
                  "Start simple, add details gradually"
                ].map((tip, i) => (
                  <p key={i} className="text-gray-300 text-xs bg-gray-700 rounded px-2 py-1.5">
                    • {tip}
                  </p>
                ))}
              </div>
            </div>

            {/* Learning Path */}
            <div>
              <h4 className="text-white font-medium text-sm mb-2">📈 Learning Path</h4>
              <div className="space-y-2">
                {[
                  { level: "Beginner", focus: "Basic navigation, primitives, transforms" },
                  { level: "Intermediate", focus: "Modifiers, materials, UV mapping" },
                  { level: "Advanced", focus: "Sculpting, animation, compositing" },
                ].map((path, i) => (
                  <div key={i} className="bg-gray-700 rounded px-2 py-1.5">
                    <span className="text-orange-400 text-xs font-medium">{path.level}:</span>
                    <span className="text-gray-300 text-xs ml-2">{path.focus}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== FLOATING BUTTON ====================
export const BlenderAIFloatingButton: React.FC<{
  onClick: () => void;
  showHelpPrompt?: boolean;
  onHelpPromptDismiss?: () => void;
}> = ({ onClick, showHelpPrompt, onHelpPromptDismiss }) => {
  return (
    <div className="absolute bottom-4 right-4 z-40">
      {/* Help Prompt */}
      {showHelpPrompt && (
        <div className="absolute bottom-16 right-0 bg-gray-800 rounded-xl p-3 shadow-lg border border-gray-700 w-48 animate-bounce">
          <p className="text-white text-sm mb-2">Need help with this step?</p>
          <div className="flex gap-2">
            <button
              onClick={onClick}
              className="flex-1 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600"
            >
              Yes
            </button>
            <button
              onClick={onHelpPromptDismiss}
              className="flex-1 py-1 bg-gray-700 text-gray-300 text-xs rounded hover:bg-gray-600"
            >
              No
            </button>
          </div>
          <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-gray-800 rotate-45 border-r border-b border-gray-700" />
        </div>
      )}
      
      {/* Floating Button */}
      <button
        onClick={onClick}
        className="w-14 h-14 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        title="AI Assistant"
      >
        <span className="text-2xl">🤖</span>
      </button>
    </div>
  );
};

export default BlenderAIAssistant;
