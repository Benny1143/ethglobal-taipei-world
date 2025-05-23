import { PayBlock } from "./components/Pay";
import { VerifyBlock } from "./components/Verify";
import { AuthBlock } from "./components/Auth";

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-y-3">
      <VerifyBlock />
      <PayBlock />
      <AuthBlock />
    </main>
  );
}
