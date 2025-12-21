import { useState } from "react";
import { TestStartPage } from "@/components/TestStartPage";
import { TestInterface } from "@/components/TestInterface";

const Index = () => {
  const [testStarted, setTestStarted] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);

  if (testStarted && selectedVariant !== null) {
    return (
      <TestInterface 
        onExit={() => {
          setTestStarted(false);
          setSelectedVariant(null);
        }} 
        variant={selectedVariant}
      />
    );
  }

  return (
    <TestStartPage 
      onStartTest={(variant: number) => {
        setSelectedVariant(variant);
        setTestStarted(true);
      }} 
    />
  );
};

export default Index;
