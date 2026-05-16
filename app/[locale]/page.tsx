import HomeClient from "../HomeClient";

export default async function Page() {
  // We don't need a second provider here; the Layout already has it!
  return <HomeClient />;
}
