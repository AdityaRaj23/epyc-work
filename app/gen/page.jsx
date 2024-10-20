"use client";

// Importing utilities
import { useState } from 'react';
import Image from 'next/image';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// Icons and images
import mobileMock from "../images/illustration-phone-mockup.svg";
import illEmpty from "../images/illustration-empty.svg"

import rarrow from "../images/icon-arrow-right.svg"
import darrow from "../images/icon-chevron-down.svg"
import dndsvg from "../images/icon-drag-and-drop.svg"

import gitico from "../images/icon-github.svg"
import twitterico from "../images/icon-twitter.svg"
import youtubeico from "../images/icon-youtube.svg"
import twitchico from "../images/icon-twitch.svg"
import gitlabico from "../images/icon-gitlab.svg"
import codepenico from "../images/icon-codepen.svg"
import facebookico from "../images/icon-facebook.svg"
import freecodecampico from "../images/icon-freecodecamp.svg"
import hashnodeico from "../images/icon-hashnode.svg"
import linkedinico from "../images/icon-linkedin.svg"
import stackovico from "../images/icon-stack-overflow.svg"

const allowedPlatforms = {
  Twitch: { color: 'bg-purple-500', icon: twitchico },
  GitHub: { color: 'bg-black', icon: gitico },
  GitLab: { color: 'bg-orange-600', icon: gitlabico },
  YouTube: { color: 'bg-red-500', icon: youtubeico },
  Twitter: { color: 'bg-sky-400', icon: twitterico },
  Codepen: { color: 'bg-yellow-500', icon: codepenico },
  Facebook: { color: 'bg-blue-600', icon: facebookico },
  Freecodecamp: { color: 'bg-green-600', icon: freecodecampico },
  Hashnode: { color: 'bg-blue-700', icon: hashnodeico },
  LinkedIn: { color: 'bg-blue-800', icon: linkedinico },
  StackOverflow: { color: 'bg-orange-400', icon: stackovico },
};

export default function CustomizeLinks() {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ platform: '', url: '' });

  const addNewLink = () => {
    setLinks([...links, newLink]);
    setNewLink({ platform: '', url: '' });
  };

  const updateLink = (index, field, value) => {
    const updatedLinks = [...links];
    updatedLinks[index][field] = value;
    // Check if the URL is valid
    if (field === 'url') {
      updatedLinks[index].isValidUrl = validateUrl(value);
    }
    setLinks(updatedLinks);
  };

  const validateUrl = (url) => {
    const allowedDomains = [
      'twitch.tv',
      'github.com',
      'gitlab.com',
      'youtube.com',
      'twitter.com',
      'codepen.io',
      'facebook.com',
      'freecodecamp.org',
      'hashnode.com',
      'linkedin.com',
      'stackoverflow.com'
    ];
    
    const urlPattern = new RegExp(
      '^https:\\/\\/(www\\.)?(' + allowedDomains.join('|').replace(/\./g, '\\.') + ')(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?\\/([a-zA-Z0-9_-]+)?$', // Adjusted to match profiles
      'i'
    );
    
    return !!urlPattern.test(url);
  };

  const removeLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return; // dropped outside the list

    const reorderedLinks = Array.from(links);
    const [removed] = reorderedLinks.splice(result.source.index, 1);
    reorderedLinks.splice(result.destination.index, 0, removed);

    setLinks(reorderedLinks);
  };

  return (
    <div className="flex flex-col md:flex-row p-6 space-y-6 md:space-y-0 md:space-x-6">
      <div className="relative flex-initial p-32 bg-white rounded-lg shadow-md">
        <div className="relative">
          <Image src={mobileMock} alt="Mobile mockup" className="relative" />
          <div className="absolute w-28 h-28 top-[64px] left-[32%] bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-10 flex flex-col items-center justify-center space-y-4 ">
            {links.map((link, index) => (
              <a
                href={link.url}
                className="text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="relative flex flex-row items-center justify-center">
                  <Image
                    src={allowedPlatforms[link.platform]?.icon || gitico}
                    className="absolute left-4"
                    width={20}
                    height={20}
                  />
                  <div
                    key={index}
                    className={`flex flex-col justify-center instrument-sans-semibold w-[15rem] h-[3rem] rounded-md p-2 -z-10 ${
                      allowedPlatforms[link.platform]?.color || 'bg-black'
                    }`}
                  >
                    <p className="block ml-8 text-sm font-medium">
                      {link.platform}
                    </p>
                  </div>
                  <Image
                    src={rarrow}
                    className="absolute right-4"
                    width={20}
                    height={20}
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative flex-1 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Customize your links</h2>
        <p className="text-gray-500 mb-4">
          Add/edit/remove links below and then share all your profiles with the world!
        </p>
        <button
          onClick={addNewLink}
          className={`w-full py-2 mb-4 border border-purple-500 text-purple-500 rounded-md hover:bg-purple-50 ${
            links.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={links.length >= 5}
        >
          + Add new link
        </button>

        {links.length === 0 && (
          <div className="flex flex-col items-center justify-center p-4 border border-dashed rounded-md">
            <Image src={illEmpty} alt="Empty illustration" />
            <h3 className="text-lg font-medium">Let’s get you started</h3>
            <p className="text-gray-500 text-center">
              Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!
            </p>
          </div>
        )}

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {links.map((link, index) => (
                  <Draggable key={index} draggableId={String(index)} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="mb-4 p-4 bg-gray-100 rounded-md">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Image src={dndsvg} className="mr-2" />
                            <span className="text-lg font-semibold">Link #{index + 1}</span>
                          </div>
                          <button
                            onClick={() => removeLink(index)}
                            className="text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="mt-2">
                          <label className="block text-sm font-medium">Platform</label>
                          <div className="relative">
                            <select
                              value={link.platform}
                              onChange={(e) => updateLink(index, 'platform', e.target.value)}
                              className="w-full mt-1 p-2 border rounded-md appearance-none"
                            >
                              <option value="" disabled>
                                Select a platform
                              </option>
                              {Object.keys(allowedPlatforms).map((platform) => (
                                <option key={platform} value={platform}>
                                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                </option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center p-2">
                              <Image src={darrow} />
                            </div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <label className="block text-sm font-medium">Link</label>
                          <input
                            type="text"
                            value={link.url}
                            onChange={(e) => updateLink(index, 'url', e.target.value)}
                            placeholder="e.g. https://www.github.com/username"
                            className={`w-full mt-1 p-2 border rounded-md ${
                              link.url ? (link.isValidUrl ? 'border-green-500' : 'border-red-500') : ''
                            }`}
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>


        <div className="flex justify-end">
          <button className="p-10 py-2 mt-4 bg-purple-500 text-white rounded-md hover:bg-purple-600">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
