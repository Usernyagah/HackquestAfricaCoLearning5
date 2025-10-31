import { useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle2, Circle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLearningProgress } from "@/hooks/useLearningProgress";
import { motion } from "framer-motion";

const solidityTopics = [
  {
    id: "strings",
    title: "Strings",
    description: "Learn how to work with strings in Solidity, including concatenation and manipulation.",
    code: `string public message = "Hello, Solidity!";

function setMessage(string memory _msg) public {
    message = _msg;
}`,
  },
  {
    id: "structs",
    title: "Structs",
    description: "Custom data structures that group related data together.",
    code: `struct Student {
    string name;
    uint256 age;
    address wallet;
}

Student public student;`,
  },
  {
    id: "arrays",
    title: "Arrays",
    description: "Dynamic and fixed-size arrays for storing collections of data.",
    code: `uint[] public dynamicArray;
uint[5] public fixedArray;

function addElement(uint _value) public {
    dynamicArray.push(_value);
}`,
  },
  {
    id: "enums",
    title: "Enums",
    description: "Define custom types with a finite set of constant values.",
    code: `enum Status { Pending, Active, Completed }
Status public currentStatus;

function setStatus(Status _status) public {
    currentStatus = _status;
}`,
  },
  {
    id: "control-flow",
    title: "Control Flow",
    description: "Conditional statements and loops for program logic.",
    code: `function checkValue(uint _value) public pure returns (string memory) {
    if (_value > 100) {
        return "High";
    } else if (_value > 50) {
        return "Medium";
    } else {
        return "Low";
    }
}`,
  },
  {
    id: "modifiers",
    title: "Modifiers",
    description: "Reusable code snippets that can modify function behavior.",
    code: `address public owner;

modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;
}

function restrictedFunction() public onlyOwner {
    // Only owner can call
}`,
  },
  {
    id: "contract-interaction",
    title: "Contract Interaction",
    description: "Call functions from other contracts and handle external interactions.",
    code: `interface IToken {
    function transfer(address to, uint amount) external;
}

function callExternalContract(address tokenAddress) public {
    IToken(tokenAddress).transfer(msg.sender, 100);
}`,
  },
];

export default function SolidityNotes() {
  const [search, setSearch] = useState("");
  const { markTopicAsViewed, isTopicViewed } = useLearningProgress();

  const filteredTopics = solidityTopics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(search.toLowerCase()) ||
      topic.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleAccordionChange = (value: string) => {
    if (value) {
      markTopicAsViewed(value);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold mb-2">Solidity Notes</h1>
        <p className="text-muted-foreground">
          Master the fundamentals of Solidity programming
        </p>
      </div>

      <GlassCard>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </GlassCard>

      <Accordion
        type="single"
        collapsible
        className="space-y-4"
        onValueChange={handleAccordionChange}
      >
        {filteredTopics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <AccordionItem value={topic.id} className="glass-card border-0">
              <AccordionTrigger className="px-6 hover:no-underline">
                <div className="flex items-center gap-3">
                  {isTopicViewed(topic.id) ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div className="text-left">
                    <h3 className="text-lg font-semibold">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground">{topic.description}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Code Example:</h4>
                    <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
                      <code className="text-sm">{topic.code}</code>
                    </pre>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>

      {filteredTopics.length === 0 && (
        <GlassCard>
          <p className="text-center text-muted-foreground py-8">
            No topics found matching your search.
          </p>
        </GlassCard>
      )}
    </div>
  );
}
