import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Generator() {
  return (
    <div className="@container/page flex flex-1 flex-col gap-8 p-6">
      <Tabs defaultValue="memshell" className="gap-6">
        <TabsList>
          <TabsTrigger value="memshell">MemShell</TabsTrigger>
          <TabsTrigger value="webshell">WebShell</TabsTrigger>
        </TabsList>
        <TabsContent value="memshell">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="webshell">
          Make changes to your account here.
        </TabsContent>
      </Tabs>
    </div>
  );
}
