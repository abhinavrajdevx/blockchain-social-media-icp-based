import { useEffect, useState } from "react";
import Header from "./Header";
import { setDoc } from "@junobuild/core";
import { nanoid } from "nanoid";
import { listDocs, getDoc, uploadFile } from "@junobuild/core";
import SendIcon from "@mui/icons-material/Send";
import SendAndArchiveIcon from "@mui/icons-material/SendAndArchive";
import CircularProgress from "@mui/material/CircularProgress";

const Posts = () => {
  const [showCreate, setshowCreate] = useState(false);
  const [uploading, setuploading] = useState(false);
  const [loading, setloading] = useState(false);
  const [posts, setposts] = useState([]);
  const [user, setuser] = useState("");
  const [image, setImage] = useState(null);
  const [name_user, set_name_user] = useState("");
  const [user_profile_image, set_user_profile_image] = useState("");
  const [ImageChanged, setImageChanged] = useState(false);
  const [comments, setcomments] = useState([]);
  const [userComment, setuserComment] = useState("");
  const [addingComment, setaddingComment] = useState("");
  const [showcreateCommentID, setshowcreateCommentID] = useState("");
  const [form, setform] = useState({
    caption: "",
    image: "",
    name: "",
  });

  useEffect(() => {
    const first_run = async () => {
      setloading(true);
      const res = await listDocs({
        collection: "posts",
      });
      setposts(res.items);
      const res_comments = await listDocs({
        collection: "comments",
      });
      setcomments(res_comments.items);
      const user_doc = await getDoc({
        collection: "users",
        key: user,
      });
      if (user.length > 1) {
        set_user_profile_image(JSON.parse(user_doc?.data)?.profileImage);
        set_name_user(JSON.parse(user_doc?.data)?.name);
      }

      setloading(false);
    };
    first_run();
  }, [user]);

  const createPost = async () => {
    if (user.length > 1) {
      setuploading(true);
      var imgURl = "";
      if (ImageChanged) {
        imgURl = await updatePhoto();
      }
      const postKey = nanoid();
      const res = await setDoc({
        collection: "posts",
        doc: {
          key: postKey,
          data: JSON.stringify({
            name: name_user,
            caption: form.caption,
            image: imgURl,
            profile_image: user_profile_image,
          }),
        },
      });
      await setDoc({
        collection: "comments",
        doc: {
          key: postKey,
          data: "",
        },
      });

      setuploading(false);
      if (res.created_at) {
        alert("Successfully uploaded");
      } else {
        alert("failure");
      }
      setshowCreate(false);
    } else {
      alert("Please Log in first.");
    }
  };

  const updatePhoto = async () => {
    const result = await uploadFile({
      data: image,
      collection: "posts",
    });

    console.log("Store uplaod image");
    console.log(result);
    return result.downloadUrl;
  };

  const handleSelectFile = async (event) => {
    setImage(event.target.files[0]);
    setImageChanged(true);
  };

  const createComment = async (postKey) => {
    if (user.length > 1) {
      setaddingComment(true);
      true;
      const res_get = await getDoc({
        collection: "comments",
        key: postKey,
      });

      await setDoc({
        collection: "comments",
        doc: {
          ...res_get,
          data:
            res_get.data +
            "$-$-$-$" +
            JSON.stringify({
              name: name_user,
              comment: userComment,
              profile_image: user_profile_image,
            }),
        },
      });
      setaddingComment(false);
    } else {
      alert("Please Log in first.");
    }
  };

  return (
    <div className="w-screen h-screen bg-black flex justify-center overflow-auto">
      <div className="w-full h-full max-w-[900px] px-3">
        <Header active={"Trending"} setuser={setuser} />

        {/* Create Post */}
        <div className="w-full py-9 ">
          {!showCreate && (
            <button
              onClick={() => setshowCreate(true)}
              className="w-full rounded-2xl border-2 border-dashed flex gap-3 items-center justify-center py-5"
            >
              <h1 className="text-3xl font-base text-gray-300">+ </h1>
              <h1 className="text-3xl font-base text-gray-300">Create Post </h1>
            </button>
          )}
          {showCreate && (
            <div className="w-full px-3 flex flex-col items-center justify-center">
              <h1 className="text-gray-300 text-xl py-6 w-full">
                Create a New Post
              </h1>
              <div className="w-full flex items-center gap-3">
                <p className="text-gray-300 text-left  py-3 ">Select Banner:</p>
                <input
                  type="file"
                  className="text-gray-300"
                  onChange={handleSelectFile}
                />
              </div>

              <p className="text-gray-300 text-left w-full py-3 ">Caption:</p>
              <input
                type="text"
                className="outline-none text-gray-300 border-b-[1px] bg-black border-yellow-300 w-full  "
                value={form.caption}
                onChange={(e) => setform({ ...form, caption: e.target.value })}
              />
              <button
                onClick={createPost}
                disabled={uploading}
                className="px-3 py-1 rounded-xl bg-yellow-300 text-black w-full max-w-[200px] text-xl font-bold mt-9  font-bold"
              >
                {!uploading ? "Post" : <CircularProgress />}
              </button>
            </div>
          )}
        </div>
        <div className="w-full py-9 flex flex-col gap-9">
          {loading && (
            <div className="w-full py-9 flex items-center justify-center">
              <h1 className="text-2xl text-gray-300">
                <CircularProgress />
              </h1>
            </div>
          )}
          {!loading &&
            posts.map((post) => (
              <div key={post.key} className="w-full flex flex-col">
                <div className="w-full flex flex-col items-center pb-3">
                  <div className="flex items-center gap-3 py-6 w-full">
                    <img
                      className="w-[30px] h-[30px] rounded-full "
                      src={JSON.parse(post.data).profile_image}
                    />
                    <h1 className="text-gray-300">
                      {JSON.parse(post.data).name}
                    </h1>
                  </div>
                  <img
                    className="w-full max-w-[600px] rounded-xl "
                    src={JSON.parse(post.data).image}
                  />

                  <h1 className="text-gray-300 py-3 w-full ">
                    {JSON.parse(post.data).caption}
                  </h1>
                  {showcreateCommentID != post.key && (
                    <div className="w-full">
                      <button
                        onClick={() => {
                          setshowcreateCommentID(post.key);
                          setuserComment("");
                        }}
                        className="px-3 py-1 rounded-xl  text-gray-300 w-full max-w-[50px] text-xl font-bold"
                      >
                        <SendAndArchiveIcon />
                      </button>
                    </div>
                  )}

                  {showcreateCommentID == post.key && (
                    <div className="w-full">
                      <p className="text-gray-300 text-left w-full ">
                        Comment:
                      </p>
                      <div className="flex w-full gap-3 items- -center">
                        <input
                          type="text"
                          className="outline-none text-gray-300 border-b-[1px] bg-black border-yellow-300 w-full  "
                          value={userComment}
                          onChange={(e) => setuserComment(e.target.value)}
                        />

                        <button
                          onClick={() => createComment(post.key)}
                          disabled={addingComment}
                          className="px-3 py-1 rounded-xl  text-yellow-300 w-full max-w-[50px] text-xl  font-bold"
                        >
                          {addingComment ? <CircularProgress /> : <SendIcon />}
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="flex w-full flex-col gap-3">
                    {comments.map((commentsByPost) => {
                      if (commentsByPost.key == post.key) {
                        const thispostComments =
                          commentsByPost.data.split("$-$-$-$");
                        return thispostComments.map((comm) => (
                          // eslint-disable-next-line react/jsx-key
                          <div className="w-full flex flex-col gap-1">
                            <div className="w-full flex items-center  gap-3">
                              {comm.split('"')[11]?.length > 1 && (
                                <img
                                  className="w-5 h-5 rounded-full "
                                  src={comm.split('"')[11]}
                                />
                              )}
                              <h1 className="text-gray-100">
                                {" "}
                                {comm.split('"')[3]}{" "}
                              </h1>
                            </div>
                            <h1 className="text-gray-100 px-7">
                              {" "}
                              {comm.split('"')[7]}{" "}
                            </h1>
                          </div>
                        ));
                      }
                    })}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
