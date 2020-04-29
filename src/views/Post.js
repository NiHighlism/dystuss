import * as React from "react";
import * as PropTypes from "prop-types";
import CommandBar from "react-uwp/CommandBar";
import AppBarButton from "react-uwp/AppBarButton";
import MarkdownRender from "react-uwp/MarkdownRender";

export default class Post extends React.Component {
  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };

  render() {
    const { theme } = this.context;

    const sampletext = `
    \n# Markdown Render Sample Text

    \n## Existence

    \n### The greatest gift that humanity has as a species is sentience; the capacity to feel, perceive, or experience subjectively. The greatest bane that humanity has is also sentience. It is this very ability that allows us to think about such stupid questions as *Who am I?*, *What is existence?* or *What is my purpose?*

    \n#### That escalated pretty quickly. For the article, yes, for me, not exactly. One of the very few things that I feel strongly about, philosophy is something that seems frequently brought up, most recently by my Sanskrit professor. Her course includes Heritage too, so these discussions are a part of the usual routine. In a discourse as simple as one of describing ourselves using first-person pronouns, came the thought-provoking question, *"koham"*, literally meaning, *Who am I* It would seem that early philosophers had too much free time in their hands, but these questions have baffled people for centuries, with even the modern-day science offering no definitive answers.

    \n##### Perhaps that is rightly so. Because there **cannot** be definitive answers. It is extremely difficult to remove personal opinions and judgements from any sort of theories or hypotheses. Scientific laws containing logical and mathematical formulations can be considered almost **unbiased**, because they undergo extensive peer reviewing and testing by the community.

    \n###### Since philosophy is way too dependent on what a person opines or observes, formalizing the thinking processes is inherently tough. Scientists have tried laying down some rules and regulations, collections of if-then statements, sets of questions and answers to standardize stuff in philosophy, so that they can categorize these thought processes and arrive at conclusions. But I feel questions in itself are limiting in nature, because the human mind can have an entire spectrum of reactions to the stimuli subjected to it. Classifying it into pre-defined notions of expectations just doesn't seem... fair.

    \n> Then there are these conceptions about the notions of the ‘good’ and the ‘bad’. We have made certain criteria of what is to be expected from a good person, and what differentiates him/her from a bad person. Of course are different perceptions about what's good and what's bad, because they're practically subjective terms. Still, there are some *universal* goods and *universal* bads. Philanthropy, dedicating one's life to the service of people are the highest of what humans can achieve. On the flip side, terrorism, oppression are the lowest bars below which a person cannot fall. These were just a few of the examples.

    \n>> This certainly begs the question: *If death is the end of all stories no matter how glorious or ordinary then what is the purpose of all our strivings? If after all we're just a tiny insignificant speck in this infinite universe, do our deeds, whether good or bad, really make any difference?* This is the essence of the existential crisis-ish questions that were stated in the beginning. To be blunt, life or human existence has no real meaning or purpose because human existence occurred out of a random chance in nature, and anything that exists by chance has no intended purpose. But we still try and make sense of the world around us. The idea is to leave the world as a better place than we found it, however temporary or short-lived our existence might be. The idea is to leave a mark, to matter, to count, to stand for something, to have made some difference that we lived at all. And I think this offers enough objective directionality in life in terms of good that needs to be achieved and bad avoided.
    `

    const itemStyle: React.CSSProperties = {
      fontWeight: "lighter",
      width: '100%',
      padding: '20px',
    };
    const styles = {
      root: theme.prefixStyle({
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "right",
        justifyContent: "right",
        flexWrap: "wrap",
        background: theme.desktopBackground
      }),
      acrylic20: { ...itemStyle, ...theme.acrylicTexture20.style },
      acrylic40: { ...itemStyle, ...theme.acrylicTexture40.style },
      acrylic60: { ...itemStyle, ...theme.acrylicTexture60.style },
      acrylic80: { ...itemStyle, ...theme.acrylicTexture80.style },
      acrylic100: { ...itemStyle, ...theme.acrylicTexture100.style }
    };
    const classes = theme.prepareStyles({ styles });
    return (
      <div className="content">
        <div {...classes.acrylic40} style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
          <p style={{ fontSize: 30, float: "left" }}>Libero repellat officiis quasi inventore!</p>
          <p style={{ fontSize: 15, float: "right" }}><span className="sdl2asset">&#xEFD3;</span>&nbsp; Rashil Gandhi</p>
          <div style={{ clear: "both" }}></div>
        </div>
        <div {...classes.acrylic60} style={{ fontSize: "18px", boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: "20px" }}>
          {/* <div className="about">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt et, non nostrum accusantium ullam debitis officiis maiores voluptas totam? Voluptates expedita et voluptas sunt corporis esse aliquam nisi perspiciatis dolor.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, voluptates illum. Nisi, dicta nihil perspiciatis alias molestias cum mollitia reiciendis quidem ipsam. Maxime eaque dolor velit. Dolore nihil dolorum eveniet. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium vero dolorum laborum quae culpa iure nemo nulla magni voluptatibus unde. Inventore impedit architecto asperiores ea nobis expedita eligendi reiciendis officiis. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, laborum, totam nihil ab soluta earum quaerat est eligendi ullam, placeat eaque? Sed quos cupiditate aperiam quisquam cumque nulla eveniet dolores.
            </p>
            <br />
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius necessitatibus nisi ad quas eveniet quis optio? Illo porro sequi explicabo voluptatem facere hic aliquid error nisi laborum, repudiandae cupiditate deleniti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut rerum rem tenetur animi neque mollitia necessitatibus eveniet quisquam totam eaque consequuntur architecto fugiat nisi repellendus culpa alias maxime, voluptatem soluta?
            </p>
          </div> */}
          <MarkdownRender text={sampletext} />
        </div>
        <div {...classes.acrylic80} style={{ fontSize: 16, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
          <div>
            <div style={{ display: 'inline-block', marginRight: "20px" }}><span className="sdl2asset">&#xF70F;</span>&nbsp; 7 Comments</div>
            <div style={{ display: 'inline-block' }}><span className="sdl2asset">&#xE3AF;</span>&nbsp; Appeal 20</div>
          </div>
          <CommandBar
            background="transparent"
            primaryCommands={[
              <AppBarButton icon={<span className="sdl2asset">&#xE8E1;</span>} label="Agree" />,
              <AppBarButton icon={<span className="sdl2asset">&#xF2B3;</span>} label="Comment" />,
              <AppBarButton icon={<span className="sdl2asset">&#xE8E0;</span>} label="Disagree" />,
            ]}
          />
        </div>
        <div {...classes.root}>
          <div {...classes.acrylic100} style={{ fontSize: 14, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: "10px", width: "100%" }}>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque velit minus dignissimos, possimus, deleniti quaerat asperiores placeat distinctio mollitia in, minima aut? Eum qui aspernatur eius. Deleniti expedita accusantium nam!</p>
            <div style={{ marginTop: "5px" }}>
              <div style={{ display: 'inline-block', marginRight: "20px" }}><span className="sdl2asset">&#xF70F;</span>&nbsp; 0 Replies</div>
              <div style={{ display: 'inline-block' }}><span className="sdl2asset">&#xE3AF;</span>&nbsp; Appeal 4</div>
            </div>
            <CommandBar
              background="transparent"
              primaryCommands={[
                <AppBarButton icon={<span className="sdl2asset">&#xE8E1;</span>} label="Agree" />,
                <AppBarButton icon={<span className="sdl2asset">&#xE97A;</span>} label="Reply" />,
                <AppBarButton icon={<span className="sdl2asset">&#xE8E0;</span>} label="Disagree" />,
              ]}
            />
          </div>
          <div {...classes.acrylic100} style={{ fontSize: 14, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: "10px", width: "100%" }}>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque velit minus dignissimos, possimus, deleniti quaerat asperiores placeat distinctio mollitia in, minima aut? Eum qui aspernatur eius. Deleniti expedita accusantium nam!</p>
            <div style={{ marginTop: "5px" }}>
              <div style={{ display: 'inline-block', marginRight: "20px" }}><span className="sdl2asset">&#xF70F;</span>&nbsp; 2 Replies</div>
              <div style={{ display: 'inline-block' }}><span className="sdl2asset">&#xE3AF;</span>&nbsp; Appeal 4</div>
            </div>
            <CommandBar
              background="transparent"
              primaryCommands={[
                <AppBarButton icon={<span className="sdl2asset">&#xE8E1;</span>} label="Agree" />,
                <AppBarButton icon={<span className="sdl2asset">&#xE97A;</span>} label="Reply" />,
                <AppBarButton icon={<span className="sdl2asset">&#xE8E0;</span>} label="Disagree" />,
              ]}
            />
          </div>
          <div {...classes.acrylic100} style={{ fontSize: 14, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: "10px", width: "98%" }}>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque velit minus dignissimos, possimus, deleniti quaerat asperiores placeat distinctio mollitia in, minima aut? Eum qui aspernatur eius. Deleniti expedita accusantium nam!</p>
            <div style={{ marginTop: "5px" }}>
              <div style={{ display: 'inline-block', marginRight: "20px" }}><span className="sdl2asset">&#xF70F;</span>&nbsp; 1 Reply</div>
              <div style={{ display: 'inline-block' }}><span className="sdl2asset">&#xE3AF;</span>&nbsp; Appeal 4</div>
            </div>
            <CommandBar
              background="transparent"
              primaryCommands={[
                <AppBarButton icon={<span className="sdl2asset">&#xE8E1;</span>} label="Agree" />,
                <AppBarButton icon={<span className="sdl2asset">&#xE97A;</span>} label="Reply" />,
                <AppBarButton icon={<span className="sdl2asset">&#xE8E0;</span>} label="Disagree" />,
              ]}
            />
          </div>
          <div {...classes.acrylic100} style={{ fontSize: 14, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: "10px", width: "96%" }}>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque velit minus dignissimos, possimus, deleniti quaerat asperiores placeat distinctio mollitia in, minima aut? Eum qui aspernatur eius. Deleniti expedita accusantium nam!</p>
            <div style={{ marginTop: "5px" }}>
              <div style={{ display: 'inline-block', marginRight: "20px" }}><span className="sdl2asset">&#xF70F;</span>&nbsp; 0 Replies</div>
              <div style={{ display: 'inline-block' }}><span className="sdl2asset">&#xE3AF;</span>&nbsp; Appeal 4</div>
            </div>
            <CommandBar
              background="transparent"
              primaryCommands={[
                <AppBarButton icon={<span className="sdl2asset">&#xE8E1;</span>} label="Agree" />,
                <AppBarButton icon={<span className="sdl2asset">&#xE97A;</span>} label="Reply" />,
                <AppBarButton icon={<span className="sdl2asset">&#xE8E0;</span>} label="Disagree" />,
              ]}
            />
          </div>
          <div {...classes.acrylic100} style={{ fontSize: 14, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: "10px", width: "100%" }}>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque velit minus dignissimos, possimus, deleniti quaerat asperiores placeat distinctio mollitia in, minima aut? Eum qui aspernatur eius. Deleniti expedita accusantium nam!</p>
            <div style={{ marginTop: "5px" }}>
              <div style={{ display: 'inline-block', marginRight: "20px" }}><span className="sdl2asset">&#xF70F;</span>&nbsp; 1 Reply</div>
              <div style={{ display: 'inline-block' }}><span className="sdl2asset">&#xE3AF;</span>&nbsp; Appeal 4</div>
            </div>
            <CommandBar
              background="transparent"
              primaryCommands={[
                <AppBarButton icon={<span className="sdl2asset">&#xE8E1;</span>} label="Agree" />,
                <AppBarButton icon={<span className="sdl2asset">&#xE97A;</span>} label="Reply" />,
                <AppBarButton icon={<span className="sdl2asset">&#xE8E0;</span>} label="Disagree" />,
              ]}
            />
          </div>
          <div {...classes.acrylic100} style={{ fontSize: 14, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: "10px", width: "98%" }}>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque velit minus dignissimos, possimus, deleniti quaerat asperiores placeat distinctio mollitia in, minima aut? Eum qui aspernatur eius. Deleniti expedita accusantium nam!</p>
            <div style={{ marginTop: "5px" }}>
              <div style={{ display: 'inline-block', marginRight: "20px" }}><span className="sdl2asset">&#xF70F;</span>&nbsp; 0 Replies</div>
              <div style={{ display: 'inline-block' }}><span className="sdl2asset">&#xE3AF;</span>&nbsp; Appeal 4</div>
            </div>
            <CommandBar
              background="transparent"
              primaryCommands={[
                <AppBarButton icon={<span className="sdl2asset">&#xE8E1;</span>} label="Agree" />,
                <AppBarButton icon={<span className="sdl2asset">&#xE97A;</span>} label="Reply" />,
                <AppBarButton icon={<span className="sdl2asset">&#xE8E0;</span>} label="Disagree" />,
              ]}
            />
          </div>
          <div {...classes.acrylic100} style={{ fontSize: 14, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: "10px", width: "100%" }}>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque velit minus dignissimos, possimus, deleniti quaerat asperiores placeat distinctio mollitia in, minima aut? Eum qui aspernatur eius. Deleniti expedita accusantium nam!</p>
            <div style={{ marginTop: "5px" }}>
              <div style={{ display: 'inline-block', marginRight: "20px" }}><span className="sdl2asset">&#xF70F;</span>&nbsp; 0 Replies</div>
              <div style={{ display: 'inline-block' }}><span className="sdl2asset">&#xE3AF;</span>&nbsp; Appeal 4</div>
            </div>
            <CommandBar
              background="transparent"
              primaryCommands={[
                <AppBarButton icon={<span className="sdl2asset">&#xE8E1;</span>} label="Agree" />,
                <AppBarButton icon={<span className="sdl2asset">&#xE97A;</span>} label="Reply" />,
                <AppBarButton icon={<span className="sdl2asset">&#xE8E0;</span>} label="Disagree" />,
              ]}
            />
          </div>
        </div>
      </div>
    );
  }
}