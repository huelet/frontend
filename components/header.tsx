import next from "next";
import Link from "next/link";
import {
  Accessibility,
  Copy,
  Help,
  Notepad,
  PaintBrush,
  Search,
  Settings,
  Subtitles,
  VideoCamera,
} from "@fdn-ui/icons-react";
import { useState } from "react";
import styles from "../styles/components/Header.module.css";
import { Modal, Menu } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useSound } from "use-sound";
import { Avatar } from "./avatar";

export interface HeaderProps {
  username?: string;
}

export const Header = ({ username }: HeaderProps) => {
  const [playBgSound] = useSound(
    "https://cdn.huelet.net/assets/sounds/Windows%20Background.wav",
    { volume: 1 }
  );
  const [playClickSound] = useSound(
    "https://cdn.huelet.net/assets/sounds/Windows%20Hardware%20Fail.wav",
    { volume: 1 }
  );
  const [searchModal, toggleSearchModal] = useState(false);
  return (
    <div className={styles.navContainer}>
      <div className={styles.navBar}>
        <div className={styles.navIcon} onClick={() => playBgSound()}>
          <Link href="/explore">
            <img
              src="https://cdn.huelet.net/assets/logo.png"
              alt="logo"
              width={64}
              height={64}
              style={{ borderRadius: "50%", cursor: "pointer" }}
            />
          </Link>
        </div>
        <div className="searchBox">
          <form action="/s" method="get">
            <input
              className={styles.searchBar}
              type="text"
              name="query"
              placeholder="Search"
            />
            <button className={`${styles.searchbutton} cursor`} type="submit">
              <div className={`${styles.searchbutton}`}>
                <Search fill={"white"} />
              </div>
            </button>
          </form>
          <button className={`${styles.searchbuttonMobile} cursor`}>
            <div
              className={`${styles.searchbuttonMobile}`}
              onClick={() => toggleSearchModal(true)}
            >
              <Search fill={"white"} />
            </div>
          </button>
          <Modal
            opened={searchModal}
            onClose={() => toggleSearchModal(false)}
            title="Search"
          >
            <div className={styles.searchModal}>
              <form action="/s" method="get">
                <input
                  className={styles.searchBarMobile}
                  type="text"
                  name="query"
                  placeholder="Search"
                />
                <button
                  className={`${styles.searchbuttonMobile} cursor`}
                  type="submit"
                >
                  <div className={`${styles.searchbuttonMobile}`}>
                    <Search fill={"white"} />
                  </div>
                </button>
              </form>
            </div>
          </Modal>
        </div>
        <div className={styles.accountIconsContainer}>
          <div className="hover cursor">
            <a href="https://dash.huelet.net">
              <div className={styles.navIcon}>
                <VideoCamera fill={"white"} width={64} height={64} />
              </div>
            </a>
          </div>
          <div
            className="settings--container hover cursor"
            onClick={() => playClickSound()}
          >
            <Link href="/auth/settings" passHref={true}>
              <div className={styles.navIcon}>
                <Settings fill={"white"} width={64} height={64} />
              </div>
            </Link>
          </div>
          <div
            className="avatar--container hover cursor"
            onClick={() => playClickSound()}
          >
            <Menu control={<Avatar username={username} />}>
              <Menu.Label>Your account</Menu.Label>
              <Menu.Item
                icon={<Settings fill={"white"} />}
                component={NextLink}
                href="/auth/settings"
              >
                Settings
              </Menu.Item>
              <Menu.Item
                icon={<PaintBrush fill={"white"} />}
                component={NextLink}
                href="/auth/settings/view"
              >
                Customization
              </Menu.Item>
              <Menu.Item
                icon={<VideoCamera fill={"white"} />}
                component={NextLink}
                href="https://dash.huelet.net/"
              >
                Your Videos
              </Menu.Item>
              <Menu.Item icon={<Subtitles fill={"white"} />} disabled>
                Huelet Premium (Coming Soon)
              </Menu.Item>
              <Menu.Item
                icon={<Accessibility fill={"white"} />}
                component={NextLink}
                href="/auth/settings/accessibility"
              >
                Accessibility Settings
              </Menu.Item>
              <Menu.Label>Help</Menu.Label>
              <Menu.Item
                icon={<Help fill={"white"} />}
                component={NextLink}
                href="https://docs.huelet.net/"
              >
                Help Center
              </Menu.Item>
              <Menu.Item
                icon={<Notepad fill={"white"} />}
                component={NextLink}
                href="https://huelet.net/s/report"
              >
                Report a problem
              </Menu.Item>
              <Menu.Label>Your data</Menu.Label>
              <Menu.Item
                icon={<Copy fill={"white"} />}
                component={NextLink}
                href="/auth/data"
              >
                Your data in Huelet
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};
