import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Follow } from "./Buttons/follow";
import styles from "../styles/components/VideoCard.module.css";
import axios from "axios";
import { Avatar } from "./avatar";
import { Popover } from "@mantine/core";
import { AvatarFilled, BulletList, Check, Location } from "@fdn-ui/icons-react";

export interface VideoCardProps {
  className?: string;
  type?: "video" | "creator" | "playlist";
  view?: "chonky" | "long";
  vuid: string;
  padding?: number;
}

export const VideoCard = ({
  className,
  type,
  view,
  vuid,
  padding,
}: VideoCardProps) => {
  const [video, setVideo] = useState<any>({});
  const [creator, setCreator] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  /* popovers and modals */
  const [authorPopover, toggleAuthorPopover] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const getData = async () => {
      let resp = await axios.get(`https://api.huelet.net/videos/${vuid}`);
      console.log(resp.data);
      setVideo(resp.data);
      // lookup creator
      const creatorResp = await axios.get(
        `https://api.huelet.net/auth/user?uid=${resp.data.vauthor}`
      );

      console.log(creatorResp.data.data);

      setCreator(creatorResp.data.data);
      setIsLoading(false);
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={`${styles.videoCard} cursor`}
      onClick={(e) => {
        e.preventDefault();
        router.push(`/w/${vuid}`);
      }}
    >
      <div
        className={styles.videoCardContentPoster}
        style={{
          backgroundImage: `url(${video.vimg})`,
        }}
      ></div>
      <div className={styles.videoCardContentInfo}>
        <div
          className={styles.videoCardContentInfoTitle}
          style={{
            padding: padding ? `${padding}em` : "0.5em",
          }}
        >
          <h2>{video.vtitle}</h2>
          <p>
            <span>
              {video.vviews === 1 ? "1 view" : `${video.vviews} views`}
            </span>
          </p>
          <Popover
            opened={authorPopover}
            onClose={() => toggleAuthorPopover(false)}
            position="top"
            target={
              <div
                className={styles.videoCardContentInfoCreator}
                onClick={() => toggleAuthorPopover(() => !authorPopover)}
              >
                <img
                  src={creator.avatar}
                  alt={`${creator.username}'s avatar`}
                  width="32"
                  height="32"
                />
                <p>
                  <span>
                    {creator.username}
                    {creator.approved ? (
                      <>
                        <Check
                          fill={"green"}
                          style={{
                            marginLeft: "0.25em",
                          }}
                        />
                        <br />
                        <p className={styles.videoCardContentInfoCreatorBio}>
                          {creator.bio}
                        </p>
                      </>
                    ) : (
                      <>
                        <br />
                        <p>Unverified</p>
                      </>
                    )}
                  </span>
                </p>
              </div>
            }
          >
            <div className={styles.videoCardContentInfoCreatorPopover}>
              <div className={styles.videoCardContentInfoCreatorPopoverAvatar}>
                <Avatar username={creator.username} />
              </div>
              <div className={styles.videoCardContentInfoCreatorPopoverInfo}>
                <h2>{creator.username}</h2>
                <span
                  className={styles.videoCardContentInfoCreatorPopoverInfoItem}
                >
                  <AvatarFilled fill={"white"} width={"16px"} height={"16px"} />
                  <span>
                    {creator.pronouns
                      ? creator.pronouns.join("/")
                      : "No pronouns"}
                  </span>
                </span>
                <span
                  className={styles.videoCardContentInfoCreatorPopoverInfoItem}
                >
                  <BulletList fill={"white"} width={"16px"} height={"16px"} />
                  <span>{creator.bio}</span>
                </span>
                <span
                  className={styles.videoCardContentInfoCreatorPopoverInfoItem}
                >
                  <Location fill={"white"} width={"16px"} height={"16px"} />
                  <span>{creator.location}</span>
                </span>
              </div>
              <div className={styles.videoCardContentInfoCreatorPopoverFollow}>
                <Follow />
              </div>
            </div>
          </Popover>
          <div className={styles.videoCardContentInfoReactions}>
            <span
              className={`${styles.videoCardContentInfoReactionsItem} ${styles.videoCardContentInfoReactionsPositive}`}
            >
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 36 36"
                  width={"16px"}
                  height={"16px"}
                >
                  <path
                    fill="#FFDB5E"
                    d="M34.956 17.916c0-.503-.12-.975-.321-1.404-1.341-4.326-7.619-4.01-16.549-4.221-1.493-.035-.639-1.798-.115-5.668.341-2.517-1.282-6.382-4.01-6.382-4.498 0-.171 3.548-4.148 12.322-2.125 4.688-6.875 2.062-6.875 6.771v10.719c0 1.833.18 3.595 2.758 3.885C8.195 34.219 7.633 36 11.238 36h18.044c1.838 0 3.333-1.496 3.333-3.334 0-.762-.267-1.456-.698-2.018 1.02-.571 1.72-1.649 1.72-2.899 0-.76-.266-1.454-.696-2.015 1.023-.57 1.725-1.649 1.725-2.901 0-.909-.368-1.733-.961-2.336.757-.611 1.251-1.535 1.251-2.581z"
                  />
                  <path
                    fill="#EE9547"
                    d="M23.02 21.249h8.604c1.17 0 2.268-.626 2.866-1.633.246-.415.109-.952-.307-1.199-.415-.247-.952-.108-1.199.307-.283.479-.806.775-1.361.775h-8.81c-.873 0-1.583-.71-1.583-1.583s.71-1.583 1.583-1.583H28.7c.483 0 .875-.392.875-.875s-.392-.875-.875-.875h-5.888c-1.838 0-3.333 1.495-3.333 3.333 0 1.025.475 1.932 1.205 2.544-.615.605-.998 1.445-.998 2.373 0 1.028.478 1.938 1.212 2.549-.611.604-.99 1.441-.99 2.367 0 1.12.559 2.108 1.409 2.713-.524.589-.852 1.356-.852 2.204 0 1.838 1.495 3.333 3.333 3.333h5.484c1.17 0 2.269-.625 2.867-1.632.247-.415.11-.952-.305-1.199-.416-.245-.953-.11-1.199.305-.285.479-.808.776-1.363.776h-5.484c-.873 0-1.583-.71-1.583-1.583s.71-1.583 1.583-1.583h6.506c1.17 0 2.27-.626 2.867-1.633.247-.416.11-.953-.305-1.199-.419-.251-.954-.11-1.199.305-.289.487-.799.777-1.363.777h-7.063c-.873 0-1.583-.711-1.583-1.584s.71-1.583 1.583-1.583h8.091c1.17 0 2.269-.625 2.867-1.632.247-.415.11-.952-.305-1.199-.417-.246-.953-.11-1.199.305-.289.486-.799.776-1.363.776H23.02c-.873 0-1.583-.71-1.583-1.583s.709-1.584 1.583-1.584z"
                  />
                </svg>
                {video.vclaps}
              </p>
            </span>
            <span
              className={`${styles.videoCardContentInfoReactionsItem} ${styles.videoCardContentInfoReactionsNegative}`}
            >
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 36 36"
                  width={"16px"}
                  height={"16px"}
                >
                  <path
                    fill="#FFDB5E"
                    d="M34.956 18.084c0 .503-.12.975-.321 1.404-1.341 4.326-7.619 4.01-16.549 4.221-1.493.035-.639 1.798-.115 5.668.341 2.517-1.282 6.382-4.01 6.382-4.498 0-.171-3.548-4.148-12.322-2.125-4.688-6.875-2.062-6.875-6.771V5.948c0-1.833.18-3.595 2.758-3.885C8.195 1.781 7.633 0 11.238 0h18.044c1.838 0 3.333 1.496 3.333 3.334 0 .762-.267 1.456-.698 2.018 1.02.571 1.72 1.649 1.72 2.899 0 .76-.266 1.454-.696 2.015 1.023.57 1.725 1.649 1.725 2.901 0 .909-.368 1.733-.961 2.336.757.611 1.251 1.535 1.251 2.581z"
                  />
                  <path
                    fill="#EE9547"
                    d="M23.02 14.751h8.604c1.17 0 2.268.626 2.866 1.633.246.415.109.952-.307 1.199-.415.247-.952.108-1.199-.307-.283-.479-.806-.775-1.361-.775h-8.81c-.873 0-1.583.71-1.583 1.583s.71 1.583 1.583 1.583H28.7c.483 0 .875.392.875.875s-.392.875-.875.875h-5.888c-1.838 0-3.333-1.495-3.333-3.333 0-1.025.475-1.932 1.205-2.544-.615-.605-.998-1.445-.998-2.373 0-1.028.478-1.938 1.212-2.549-.611-.604-.99-1.441-.99-2.367 0-1.12.559-2.108 1.409-2.713-.524-.589-.852-1.356-.852-2.204 0-1.838 1.495-3.333 3.333-3.333h5.484c1.17 0 2.269.625 2.867 1.632.247.415.11.952-.305 1.199-.416.245-.953.11-1.199-.305-.285-.479-.808-.776-1.363-.776h-5.484c-.873 0-1.583.71-1.583 1.583s.71 1.583 1.583 1.583h6.506c1.17 0 2.27.626 2.867 1.633.247.416.11.953-.305 1.199-.419.251-.954.11-1.199-.305-.289-.487-.799-.777-1.363-.777h-7.063c-.873 0-1.583.711-1.583 1.584s.71 1.583 1.583 1.583h8.091c1.17 0 2.269.625 2.867 1.632.247.415.11.952-.305 1.199-.417.246-.953.11-1.199-.305-.289-.486-.799-.776-1.363-.776H23.02c-.873 0-1.583.71-1.583 1.583s.709 1.584 1.583 1.584z"
                  />
                </svg>
                {video.vcraps}
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
