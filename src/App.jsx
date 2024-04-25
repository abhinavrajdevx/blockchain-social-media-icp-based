import { useEffect } from "react";
import { signIn } from "@junobuild/core";
import { authSubscribe } from "@junobuild/core";
import { initJuno } from "@junobuild/core";
import { setDoc } from "@junobuild/core";
import { getDoc } from "@junobuild/core";
import Posts from "./components/Posts";

function App() {
  useEffect(() => {}, []);
  const testStorage = async () => {
    await initJuno({
      satelliteId: "s7qdh-yiaaa-aaaal-ajapa-cai",
    });
    await setDoc({
      collection: "products",
      doc: {
        key: "1",
        data: "myExample",
      },
    });

    const myDoc = await getDoc({
      collection: "products",
      key: "1",
    });
    console.log(myDoc);
  };
  //testStorage();
  initJuno({
    satelliteId: "s7qdh-yiaaa-aaaal-ajapa-cai",
  });

  return (
    <>
      <div className="bg-black w-screen flex justify-center">
        <Posts />
      </div>
    </>
  );
}

export default App;
