import { getDoc, setDoc } from "@junobuild/core";
import { useEffect, useState } from "react";
import Header from "./Header";
import { uploadFile } from "@junobuild/core";
import CircularProgress from "@mui/material/CircularProgress";

const Profile = () => {
  const [saving, setsaving] = useState(false);
  const [loading, setloading] = useState(false);
  const [updatedUser, setupdatedUser] = useState(false);
  const [user, setuser] = useState("");
  const [image, setImage] = useState(null);
  const [profileImageChanged, setprofileImageChanged] = useState(false);
  const [form, setform] = useState({
    profileImage: "",
    name: "",
  });

  useEffect(() => {
    const first_run = async () => {
      setloading(true);
      const res_get = await getDoc({
        collection: "users",
        key: user,
      });
      setloading(false);
      if (!res_get) {
        setupdatedUser(false);
        // alert("User data not updated");
      } else {
        setupdatedUser(true);
        setform(JSON.parse(res_get.data));
        // alert("User exists");
      }
      console.log(res_get);
    };
    first_run();
  }, [user]);

  const updateuser = async () => {
    if (user.length > 1) {
      setsaving(true);
      try {
        const res_get = await getDoc({
          collection: "users",
          key: user,
        });
        var imgURL = form.profileImage;

        if (profileImageChanged) {
          console.log("Uploading photo ...");
          imgURL = await updatePhoto();
        }
        console.log("Image url : ");
        console.log(imgURL);
        if (!res_get) {
          console.log("updating database ...");
          const res = await setDoc({
            collection: "users",
            doc: {
              key: user,
              data: JSON.stringify({
                profileImage: imgURL,
                name: form.name,
              }),
            },
          });
          console.log(res);
        } else {
          const res = await setDoc({
            collection: "users",
            doc: {
              ...res_get,
              data: JSON.stringify({
                profileImage: imgURL,
                name: form.name,
              }),
            },
          });
        }
      } catch (error) {}
      setsaving(false);
    } else {
      alert("Please Log in first.");
    }
  };

  const updatePhoto = async () => {
    const result = await uploadFile({
      data: image,
      collection: "profile_photos",
    });

    console.log("Store uplaod image");
    console.log(result);
    return result.downloadUrl;
  };

  const handleSelectFile = async (event) => {
    setImage(event.target.files[0]);
    setprofileImageChanged(true);
  };

  return (
    <div className="w-screen h-screen bg-black overflow-auto">
      <div className="bg-black w-full flex items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center  max-w-[900px] px-3">
          <Header active={"profile"} setuser={setuser} />
          {!loading && user.length > 1 && (
            <div className="w-full mt-[50px] pb-9 flex flex-col items-center justify-center">
              <img
                src={form.profileImage}
                className="w-[150px] h-[150px] rounded-full "
              />
              <div className="w-full flex items-center justify-center text-gray-300 pt-9">
                <input type="file" className="" onChange={handleSelectFile} />
              </div>
              <p className="text-gray-300 text-left w-full py-3 max-w-[350px]  ">
                Name:
              </p>
              <input
                type="text"
                className="outline-none text-gray-300 border-b-[1px] bg-black border-yellow-300 w-full max-w-[350px] "
                value={form.name}
                onChange={(e) => setform({ ...form, name: e.target.value })}
              />

              <button
                onClick={updateuser}
                className="px-3 py-1 rounded-xl bg-yellow-300 text-black w-full text-xl font-bold mt-9 max-w-[250px] "
              >
                {saving ? <CircularProgress /> : "Save"}
              </button>
            </div>
          )}
          {!loading && user.length == 0 && (
            <div className="w-full py-9 flex items-center justify-center">
              <h1 className="text-2xl text-gray-300">Sign in to continue...</h1>
            </div>
          )}
          {loading && (
            <div className="w-full py-9 flex items-center justify-center">
              <h1 className="text-2xl text-gray-300">
                <CircularProgress />
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
