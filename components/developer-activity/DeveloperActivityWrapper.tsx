import { DeveloperActivityHub } from "@/components/developer-activity/DeveloperActivityHub";
import { getDeveloperActivityHub } from "@/server/developer-activity/activity-service";

export async function DeveloperActivityWrapper() {
  const data = await getDeveloperActivityHub();

  return <DeveloperActivityHub data={data} />;
}
