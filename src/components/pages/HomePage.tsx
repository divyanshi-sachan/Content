'use client';

import { useRef, useState } from "react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { MotionValue, motion, useMotionValue, useMotionValueEvent, useSpring, useTransform } from "framer-motion";
import { springGentle, springRigid } from "@/lib/motion";
import { use3DScroll, useCameraTilt, useCursorMotion, useJitter } from "@/lib/motion-hooks";

interface HomePageProps {
  userId?: string | null;
}

const chaosItems = [
  "Briefs",
  "Brand PDFs",
  "Canva files",
  "WhatsApp approvals",
  "Notion links",
];

const antiCanvaLines = [
  "Templates scale mediocrity.",
  "Consistency beats creativity.",
  "AI does not replace taste. It enforces it.",
];

const promptOutputs = [
  "Instagram carousel",
  "Reel script",
  "Caption",
  "Hook variations",
  "CTA variants",
  "Story frames",
];

type RevealTextProps = {
  text: string;
  progress: MotionValue<number>;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  offset?: number;
};

const RevealText = ({ text, className, as = "h2" }: RevealTextProps) => {
  const MotionTag = motion[as];
  return <MotionTag className={className}>{text}</MotionTag>;
};

type ChaosNodeProps = {
  label: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  progress: MotionValue<number>;
  jitterAmp: MotionValue<number>;
  phase: number;
};

const ChaosNode = ({ label, startX, startY, endX, endY, progress, jitterAmp, phase }: ChaosNodeProps) => {
  const x = useTransform(progress, [0, 1], [startX, endX]);
  const y = useTransform(progress, [0, 1], [startY, endY]);
  const { x: jitterX, y: jitterY } = useJitter(jitterAmp, phase);

  return (
    <motion.div style={{ x, y }} className="absolute">
      <motion.div
        style={{ x: jitterX, y: jitterY }}
        className="text-sm font-medium text-gray-500 border border-gray-200 bg-white px-4 py-2 rounded-full"
      >
        {label}
      </motion.div>
    </motion.div>
  );
};

type BranchCardProps = {
  label: string;
  index: number;
  progress: MotionValue<number>;
};

const BranchCard = ({ label, index, progress }: BranchCardProps) => {
  const side = index % 2 === 0 ? -1 : 1;
  const x = useTransform(progress, [0, 1], [0, side * (18 + index * 2)]);
  const y = useTransform(progress, [0, 1], [0, (index - 2) * 6]);
  const scale = useTransform(progress, [0, 1], [0.96, 1]);

  return (
    <motion.div
      style={{ x, y, scale }}
      className="rounded-xl border border-gray-800 bg-gray-950 px-3 py-4"
    >
      {label}
    </motion.div>
  );
};

type SystemModuleProps = {
  label: string;
};

const SystemModule = ({ label }: SystemModuleProps) => {
  const glow = useMotionValue(0);
  const glowSpring = useSpring(glow, springGentle);
  const shadow = useTransform(
    glowSpring,
    [0, 1],
    ["0 0 0 rgba(0,0,0,0)", "0 18px 40px rgba(0,0,0,0.45)"],
  );
  const glowOpacity = useTransform(glowSpring, [0, 1], [0, 0.35]);

  return (
    <motion.div
      onHoverStart={() => glow.set(1)}
      onHoverEnd={() => glow.set(0)}
      style={{ boxShadow: shadow, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.04 }}
      transition={springGentle}
      className="relative rounded-xl border border-gray-700 p-4 bg-gray-950"
    >
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 rounded-xl bg-white/10"
      />
      <motion.div style={{ translateZ: 14 }} className="relative text-xs">
        {label}
      </motion.div>
    </motion.div>
  );
};

type DNAConstraintProps = {
  label: string;
  index: number;
  progress: MotionValue<number>;
};

const DNAConstraint = ({ label, index, progress }: DNAConstraintProps) => {
  const rotate = useTransform(progress, [0, 1], [-1 + index * 0.4, 1 - index * 0.2]);

  return (
    <Card className="border-gray-200 shadow-none">
      <CardContent className="p-5">
        <motion.div style={{ rotate }} className="text-sm font-medium">
          {label}
        </motion.div>
        <p className="text-xs text-gray-500 mt-2">
          Locked, enforced, and carried across every format.
        </p>
      </CardContent>
    </Card>
  );
};

export const HomePage = ({ userId }: HomePageProps) => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const chaosRef = useRef<HTMLDivElement | null>(null);
  const promptRef = useRef<HTMLDivElement | null>(null);
  const dnaRef = useRef<HTMLDivElement | null>(null);
  const collabRef = useRef<HTMLDivElement | null>(null);
  const antiRef = useRef<HTMLDivElement | null>(null);
  const notRef = useRef<HTMLDivElement | null>(null);
  const whoRef = useRef<HTMLDivElement | null>(null);
  const futureRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  const heroMotion = use3DScroll(heroRef, { zFrom: -200, zTo: 60, rotateFrom: 2, rotateTo: -1, scaleFrom: 0.97 });
  const chaosMotion = use3DScroll(chaosRef, { zFrom: -220, zTo: 70, rotateFrom: 3, rotateTo: -1, scaleFrom: 0.96 });
  const promptMotion = use3DScroll(promptRef, { zFrom: -220, zTo: 70, rotateFrom: 3, rotateTo: -1, scaleFrom: 0.96 });
  const dnaMotion = use3DScroll(dnaRef, { zFrom: -210, zTo: 65, rotateFrom: 3, rotateTo: -1, scaleFrom: 0.965 });
  const collabMotion = use3DScroll(collabRef, { zFrom: -220, zTo: 70, rotateFrom: 3, rotateTo: -1, scaleFrom: 0.96 });
  const antiMotion = use3DScroll(antiRef, { zFrom: -180, zTo: 55, rotateFrom: 2, rotateTo: -1, scaleFrom: 0.975 });
  const notMotion = use3DScroll(notRef, { zFrom: -210, zTo: 65, rotateFrom: 3, rotateTo: -1, scaleFrom: 0.965 });
  const whoMotion = use3DScroll(whoRef, { zFrom: -210, zTo: 65, rotateFrom: 3, rotateTo: -1, scaleFrom: 0.965 });
  const futureMotion = use3DScroll(futureRef, { zFrom: -220, zTo: 70, rotateFrom: 3, rotateTo: -1, scaleFrom: 0.96 });
  const ctaMotion = use3DScroll(ctaRef, { zFrom: -160, zTo: 50, rotateFrom: 2, rotateTo: -1, scaleFrom: 0.98 });

  const { parallaxX, parallaxY, tiltX, tiltY, innerX, innerY } = useCursorMotion(heroRef);
  const { driftX, driftY } = useCameraTilt(heroRef);
  const innerXSmall = useTransform(innerX, (value) => value * 0.6);
  const innerYSmall = useTransform(innerY, (value) => value * 0.6);

  const chaosProgress = useSpring(
    useTransform(chaosMotion.scrollYProgress, [0, 0.6, 1], [0, 0.35, 1]),
    springRigid,
  );
  const jitterAmp = useTransform(chaosProgress, [0, 1], [10, 0]);
  const barScale = useTransform(chaosProgress, [0, 1], [0.2, 1]);

  const sharedScale = useTransform(collabMotion.scrollYProgress, [0, 1], [0.85, 1]);
  const promptBgY = useTransform(promptMotion.scrollYProgress, [0, 1], [18, -18]);
  const loopTextY = useTransform(futureMotion.scrollYProgress, [0, 1], [10, -12]);
  const chaosBarStretch = useTransform(chaosMotion.velocity, [-900, 0, 900], [1.1, 1, 0.92]);

  return (
    <div
      className="min-h-screen text-gray-900"
      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
    >
      <div className="fixed inset-0 bg-white" style={{ transform: "translateZ(-1200px)" }} />
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-sm uppercase tracking-[0.35em] text-gray-700">Content Infrastructure</div>
          <div className="flex items-center gap-2">
            {!userId ? (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="bg-gray-900 text-white hover:bg-gray-800">
                    Enter the system
                  </Button>
                </SignUpButton>
              </>
            ) : (
              <Link href="/dashboard">
                <Button className="bg-gray-900 text-white hover:bg-gray-800">Dashboard</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <motion.section
        ref={heroRef}
        style={{ scale: heroMotion.scale, rotateX: heroMotion.rotateX, translateZ: heroMotion.z, transformStyle: "preserve-3d" }}
        className="pt-24 pb-20 px-4 border-b border-gray-200"
      >
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gray-500 mb-5">
              A belief system for content
            </p>
            <RevealText
              as="h1"
              text="Content is infrastructure. Build it once. Enforce it forever."
              progress={heroMotion.scrollYProgress}
              className="text-4xl md:text-5xl font-semibold leading-tight mb-6"
            />
            <p className="text-lg text-gray-600 max-w-xl mb-8">
              Brands upload identity once. AI enforces consistency forever. Creators prompt ideas.
              The system outputs platform-native content and keeps every brand aligned in shared space.
            </p>
            <div className="flex flex-wrap gap-3">
              {!userId ? (
                <>
                  <SignUpButton mode="modal">
                    <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800">
                      Enter the system
                    </Button>
                  </SignUpButton>
                  <SignInButton mode="modal">
                    <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                      View manifesto
                    </Button>
                  </SignInButton>
                </>
              ) : (
                <Link href="/dashboard">
                  <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800">
                    Open dashboard
                  </Button>
                </Link>
              )}
            </div>
          </div>
          <motion.div
            style={{ x: parallaxX, y: parallaxY }}
            className="relative rounded-[32px] border border-gray-200 bg-white p-6 perspective-1200"
          >
            <motion.div
              animate={{ y: [-2, 2, -2], rotateY: [0, 6, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-[32px] border border-gray-200"
            />
            <motion.div
              style={{ rotateX: tiltX, rotateY: tiltY, x: driftX, y: driftY }}
              className="relative rounded-3xl border border-gray-900 bg-gray-900 text-white p-6 preserve-3d"
            >
              <motion.div style={{ x: innerX, y: innerY }} className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">
                System core
              </motion.div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {["Brand DNA", "Prompt Layer", "Compiler", "Distribution"].map((label) => (
                  <SystemModule key={label} label={label} />
                ))}
              </div>
              <motion.div
                style={{ x: innerXSmall, y: innerYSmall }}
                className="mt-5 rounded-xl border border-gray-700 p-4 text-xs text-gray-400"
              >
                Every output traces back to the same identity graph.
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        ref={chaosRef}
        style={{ scale: chaosMotion.scale, rotateX: chaosMotion.rotateX, translateZ: chaosMotion.z, transformStyle: "preserve-3d" }}
        className="py-20 px-4 border-b border-gray-200"
      >
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gray-500 mb-5">The Content Chaos Map</p>
            <RevealText
              text="Content did not get harder. It got louder."
              progress={chaosMotion.scrollYProgress}
              className="text-3xl md:text-4xl font-semibold mb-4"
            />
            <p className="text-gray-600 mb-4">
              We did not add another tool. We removed the noise.
            </p>
          </div>
          <div className="relative h-[320px] rounded-3xl border border-gray-200 bg-white overflow-hidden">
            {chaosItems.map((item, index) => (
              <ChaosNode
                key={item}
                label={item}
                startX={-30 + index * 38}
                startY={40 + index * 30}
                endX={40 + index * 32}
                endY={30 + (index % 2) * 50}
                progress={chaosProgress}
                jitterAmp={jitterAmp}
                phase={index * 0.8}
              />
            ))}
            <motion.div
              style={{ scaleX: barScale, scaleY: chaosBarStretch }}
              className="absolute inset-x-10 bottom-12 origin-left rounded-2xl border border-gray-900 bg-gray-900 text-white text-sm px-6 py-4"
            >
              One Brand System
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={promptRef}
        style={{ scale: promptMotion.scale, rotateX: promptMotion.rotateX, translateZ: promptMotion.z, transformStyle: "preserve-3d" }}
        className="py-20 px-4 bg-gray-950 text-white border-b border-gray-900"
      >
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gray-400 mb-5">Prompt to Infrastructure</p>
            <RevealText
              text="A prompt becomes a system diagram."
              progress={promptMotion.scrollYProgress}
              className="text-3xl md:text-4xl font-semibold mb-4"
            />
            <p className="text-gray-300 mb-6">
              You give a single instruction. The compiler branches it into platform-native output.
              It feels less like a tool and more like a runtime.
            </p>
          </div>
          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-6 relative overflow-hidden">
            <motion.div
              style={{ y: promptBgY }}
              className="absolute inset-0 border border-gray-800 rounded-3xl"
            />
            <div className="relative">
              <div className="text-xs text-gray-500 mb-4">Terminal</div>
              <div className="rounded-xl border border-gray-800 bg-gray-950 p-4 text-sm text-gray-300">
                Launch post for collab with X brand
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 text-xs text-gray-300">
                {promptOutputs.map((item, index) => (
                  <BranchCard key={item} label={item} index={index} progress={promptMotion.scrollYProgress} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={dnaRef}
        style={{ scale: dnaMotion.scale, rotateX: dnaMotion.rotateX, translateZ: dnaMotion.z, transformStyle: "preserve-3d" }}
        className="py-20 px-4 border-b border-gray-200"
      >
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gray-500 mb-5">Brand DNA Engine</p>
            <RevealText
              text="Your brand does not live in guidelines. It lives in constraints."
              progress={dnaMotion.scrollYProgress}
              className="text-3xl md:text-4xl font-semibold mb-4"
            />
            <p className="text-gray-600">
              This is not just generation. It is enforcement. Every output is evaluated against the system.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {["Tone rules", "Visual rules", "Forbidden phrases", "CTA patterns"].map((item, index) => (
              <DNAConstraint
                key={item}
                label={item}
                index={index}
                progress={dnaMotion.scrollYProgress}
              />
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={collabRef}
        style={{ scale: collabMotion.scale, rotateX: collabMotion.rotateX, translateZ: collabMotion.z, transformStyle: "preserve-3d" }}
        className="py-20 px-4 bg-gray-950 text-white border-b border-gray-900"
      >
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gray-400 mb-5">
              Collaboration Without Compromise
            </p>
            <RevealText
              text="Multiple brands. One shared language."
              progress={collabMotion.scrollYProgress}
              className="text-3xl md:text-4xl font-semibold mb-4"
            />
            <p className="text-gray-300">
              Each brand keeps its identity. AI resolves conflicts automatically. Output respects every
              collaborator without dilution.
            </p>
          </div>
          <div className="relative h-[280px] rounded-3xl border border-gray-800 bg-gray-900 overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              {[
                { top: "20%", left: "20%", label: "Brand A" },
                { top: "60%", left: "30%", label: "Brand B" },
                { top: "35%", left: "65%", label: "Brand C" },
              ].map((node) => (
                <div
                  key={node.label}
                  className="absolute rounded-full border border-gray-700 bg-gray-950 text-xs text-gray-200 px-4 py-2"
                  style={{ top: node.top, left: node.left }}
                >
                  {node.label}
                </div>
              ))}
            </motion.div>
            <motion.div
              style={{ scale: sharedScale }}
              className="absolute inset-10 rounded-3xl border border-gray-800"
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-400">
              Shared language space
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={antiRef}
        style={{ scale: antiMotion.scale, rotateX: antiMotion.rotateX, translateZ: antiMotion.z, transformStyle: "preserve-3d" }}
        className="py-20 px-4 border-b border-gray-200"
      >
        <div className="container mx-auto space-y-6 text-2xl md:text-4xl font-semibold">
          {antiCanvaLines.map((line, index) => (
            <RevealText
              key={line}
              text={line}
              progress={antiMotion.scrollYProgress}
              offset={index * 0.2}
              as="h3"
              className="leading-tight"
            />
          ))}
        </div>
      </motion.section>

      <motion.section
        ref={notRef}
        style={{ scale: notMotion.scale, rotateX: notMotion.rotateX, translateZ: notMotion.z, transformStyle: "preserve-3d" }}
        className="py-20 px-4 bg-gray-950 text-white border-b border-gray-900"
      >
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gray-400 mb-5">What this is not</p>
            <RevealText
              text="This is not:"
              progress={notMotion.scrollYProgress}
              className="text-3xl md:text-4xl font-semibold mb-4"
            />
            <ul className="space-y-3 text-gray-300 text-sm">
              <li>A design tool</li>
              <li>A caption generator</li>
              <li>A prompt playground</li>
              <li>A freelancer replacement</li>
            </ul>
          </div>
          <RevealText
            text="This is content infrastructure."
            progress={notMotion.scrollYProgress}
            className="text-3xl md:text-4xl font-semibold text-white"
          />
        </div>
      </motion.section>

      <motion.section
        ref={whoRef}
        style={{ scale: whoMotion.scale, rotateX: whoMotion.rotateX, translateZ: whoMotion.z, transformStyle: "preserve-3d" }}
        className="py-20 px-4 border-b border-gray-200"
      >
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gray-500 mb-5">Who this is for</p>
            <RevealText
              text="The operators of modern brands."
              progress={whoMotion.scrollYProgress}
              className="text-3xl md:text-4xl font-semibold mb-4"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Founders", pain: "Your brand voice is fractured.", outcome: "One system, enforced." },
              { name: "Content leads", pain: "Production is chaotic.", outcome: "A calm pipeline." },
              { name: "Agencies", pain: "Collabs dilute identity.", outcome: "Shared language, no compromise." },
              { name: "Creators", pain: "Prompts are random.", outcome: "Structured output." },
            ].map((persona) => (
              <motion.div
                key={persona.name}
                whileHover={{ scale: 1.02 }}
                transition={springGentle}
                className="rounded-2xl border border-gray-200 p-5 bg-white"
              >
                <div className="text-sm font-semibold">{persona.name}</div>
                <div className="text-xs text-gray-500 mt-2">Pain</div>
                <div className="text-sm">{persona.pain}</div>
                <div className="text-xs text-gray-500 mt-3">Outcome</div>
                <div className="text-sm">{persona.outcome}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={futureRef}
        style={{ scale: futureMotion.scale, rotateX: futureMotion.rotateX, translateZ: futureMotion.z, transformStyle: "preserve-3d" }}
        className="py-20 px-4 bg-gray-950 text-white border-b border-gray-900"
      >
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gray-400 mb-5">The Future Loop</p>
            <RevealText
              text="Your brand learns. Your content compounds."
              progress={futureMotion.scrollYProgress}
              className="text-3xl md:text-4xl font-semibold mb-4"
            />
            <p className="text-gray-300">
              Every post improves the system. Brand intelligence grows over time. The infrastructure
              becomes faster, sharper, and more precise with every output.
            </p>
          </div>
          <div className="relative h-[260px] rounded-3xl border border-gray-800 bg-gray-900 overflow-hidden">
            <motion.div
              className="absolute inset-8 rounded-full border border-gray-800"
              animate={{ rotate: 360 }}
              transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-16 rounded-full border border-gray-700"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              style={{ y: loopTextY }}
              className="absolute inset-0 flex items-center justify-center text-xs text-gray-400"
            >
              Looping intelligence
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={ctaRef}
        style={{ scale: ctaMotion.scale, rotateX: ctaMotion.rotateX, translateZ: ctaMotion.z, transformStyle: "preserve-3d" }}
        className="py-20 px-4"
      >
        <div className="container mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <RevealText
            text="Build once. Create forever."
            progress={ctaMotion.scrollYProgress}
            className="text-3xl md:text-4xl font-semibold"
          />
          {!userId ? (
            <SignUpButton mode="modal">
              <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800">
                Enter the system
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </SignUpButton>
          ) : (
            <Link href="/dashboard">
              <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800">
                Enter the system
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </motion.section>

      <footer className="py-8 px-4 border-t border-gray-200">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2024 Content Infrastructure. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
};