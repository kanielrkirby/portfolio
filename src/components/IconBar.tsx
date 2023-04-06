import Icon from "./Icon";

export default function IconBar({ className }: { className?: string }) {
  return (
    <div className={"pointer-events-none " + className}>
      <ul className="flex justify-end gap-4">
        <Icon name="Email" link="mailto:kanielrkirby@runbox.com" />
        <Icon
          name="LinkedIn"
          link="https://www.linkedin.com/in/kaniel-kirby-9b1460261/"
        />
        <Icon name="Github" link="https://github.com/piratey7007/" />
        <Icon
          name="Discord"
          link="https://discordapp.com/users/347554007750803459/"
        />
        <Icon
          name="Reddit"
          link="https://www.reddit.com/user/CompetitiveAd7245/"
        />
        <Icon name="Resume" link="https://www.google.com/drive/" />
      </ul>
    </div>
  );
}
