'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// This function can be nested or kept separate, but it's cleaner to have it process a string and return nodes.
const applyStyling = (content: string): React.ReactNode[] => {
    // This regex looks for [tag]content[/tag] and handles nested tags.
    // It's non-greedy `(.*?)` and uses a negative lookahead to not jump over nested same tags.
    const tagRegex = /\[(blau|weiss|grau|fett|klein|liste)\]([\s\S]*?)\[\/\1\]/gs;

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = tagRegex.exec(content)) !== null) {
        const [fullMatch, tagName, innerContent] = match;

        // Push the text before the current match
        if (match.index > lastIndex) {
            parts.push(content.substring(lastIndex, match.index));
        }
        
        let className = '';
        let Wrapper: keyof JSX.IntrinsicElements = 'span';

        switch(tagName) {
            case 'blau': className = 'text-primary'; break;
            case 'weiss': className = 'text-background'; break;
            case 'grau': className = 'text-background/80'; break;
            case 'fett': className = 'font-bold'; break;
            case 'klein': className = 'text-[clamp(0.7rem,2.3cqw,1rem)] leading-snug'; break;
            case 'liste': 
                Wrapper = 'li';
                className = 'list-disc ml-5 pl-2';
                break;
        }

        // Recursively apply styling to the inner content
        const styledChildren = applyStyling(innerContent);

        parts.push(
            <Wrapper key={match.index} className={className}>
                {styledChildren}
            </Wrapper>
        );
        
        lastIndex = tagRegex.lastIndex;
    }

    // Push any remaining text after the last match
    if (lastIndex < content.length) {
        parts.push(content.substring(lastIndex));
    }
    
    // If only one part, it's a string, otherwise it's an array of nodes
    return parts;
};


const renderLine = (line: string, index: number): React.ReactNode => {
    // Handle the new [break] tag for smaller vertical space
    if (line.trim() === '[break]') {
        return <div key={index} className="h-[0.5em]"></div>;
    }
    
    // If the line is wrapped in [liste], it's handled by applyStyling.
    // Here we just handle plain text lines as paragraphs.
    const styledContent = applyStyling(line);
    
    // Check if the result is a list item, if so, return it directly
    if (Array.isArray(styledContent) && styledContent.length === 1 && React.isValidElement(styledContent[0]) && styledContent[0].type === 'li') {
        return React.cloneElement(styledContent[0], { key: index });
    }

    // Otherwise, wrap in a paragraph
    return <p key={index} className="min-h-[1.2em]">{styledContent}</p>;
};

interface VitaRendererProps {
    text: string;
}

export const VitaRenderer: React.FC<VitaRendererProps> = ({ text }) => {
    if (!text) {
        return null;
    }
    const sections = text.split('---');

    return (
        <>
            {sections.map((section, sectionIndex) => {
                const lines = section.trim().split('\n');
                
                return (
                    <div key={sectionIndex} className={cn(sectionIndex > 0 && 'mt-4 pt-4 border-t border-background/20')}>
                        {lines.map((line, lineIndex) => renderLine(line, lineIndex))}
                    </div>
                );
            })}
        </>
    );
};
