import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function PollCreator() {
    const [options, setOptions] = useState([""]);

    const addOption = () => {
        setOptions([...options, ""]);
    };

    const updateOption = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    return (
        <Sheet>
            <SheetTrigger>
                <div>
                    <Plus className="w-5 h-5" />
                </div>
            </SheetTrigger>
            <SheetContent side="bottom" className="p-4">
                <SheetHeader>
                    <SheetTitle>Create a Poll</SheetTitle>
                </SheetHeader>
                <div className="space-y-2">
                    <Input placeholder="Poll question" className="w-full" />
                    {options.map((option, index) => (
                        <Input
                            key={index}
                            placeholder={`Option ${index + 1}`}
                            value={option}
                            onChange={(e) => updateOption(index, e.target.value)}
                            className="w-full"
                        />
                    ))}
                    <Button onClick={addOption} variant="outline">
                        Add Option
                    </Button>
                    <Button className="w-full mt-2">Create Poll</Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
