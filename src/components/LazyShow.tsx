import { useInView } from "react-intersection-observer";

export  function LazyShow({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} style={{ minHeight: "20px" }}>
      {inView ? children : null}
    </div>
  );
}
