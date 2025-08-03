import LinkButton from "./components/LinkButton";
import SectionHeader from "./components/SectionHeader";

const LINK_LIST = [
  {
    title: "나의 그루밍 지수 분석",
    href: "/mypage/grooming",
  },
  {
    title: "프로필 수정",
    href: "/mypage/edit",
  },
];

const Page = () => {
  return (
    <SectionHeader title="마이페이지" isMain>
      <section className="flex gap-6">
        {LINK_LIST.map((link) => (
          <LinkButton key={link.title} title={link.title} href={link.href} />
        ))}
      </section>
    </SectionHeader>
  );
};

export default Page;
