import Icon from "./Icon";

export default function IconBar({
  className,
  place,
}: {
  className?: string;
  place?: "top" | "bottom" | "left" | "right";
}) {
  return (
    <div className={className}>
      <ul className="flex justify-end gap-4">
        <Icon
          name="Email"
          link="mailto:kanielrkirby@runbox.com"
          place={place}
        />
        <Icon
          name="LinkedIn"
          link="https://www.linkedin.com/in/kaniel-kirby-9b1460261/"
          place={place}
        />
        <Icon
          name="Github"
          link="https://github.com/piratey7007/"
          place={place}
        />
        <Icon
          name="Discord"
          link="https://discordapp.com/users/347554007750803459/"
          place={place}
        />
        <Icon
          name="Reddit"
          link="https://www.reddit.com/user/CompetitiveAd7245/"
          place={place}
        />
        <Icon
          name="Resume"
          link="https://www.google.com/drive/"
          place={place}
        />
      </ul>
    </div>
  );
}
