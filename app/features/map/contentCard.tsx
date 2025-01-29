"use client"

import { fetchpost } from "@/app/lib/api"
import { Card, Group, Text, Badge, Button } from "@mantine/core"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function ContentsCard() {

    const [workplacePosts, setWorkplacePosts] = useState([])

    useEffect(() => {
        // async function fetchWorkplacePosts() {
        // try {
        //     const response = await fetch('/api/posts?category=Workplace')
        //     const data = await response.json()
        //     setWorkplacePosts(data)
        //     console.log("data", data);
        // } catch (error) {
        //     console.error("Error fetching workplace posts:", error)
        // }
        // }

        // fetchWorkplacePosts()
        const data = fetchpost(); //投稿データにpostworkplaceを加えた形でフェッチする。
        console.log("dataとれたよ", data);
    }, [])

    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder className="max-w-md">
        <Card.Section className="relative">
          <Image
            src="/vercel.svg" 
            alt="Modern apartment in Melbourne"
            width={400}
            height={300}
            className="w-full object-cover"
          />
          <Button
            variant="subtle"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white/90 rounded-full p-2"
            aria-label="Add to favorites"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </Button>
        </Card.Section>
  
        <div className="flex justify-between mt-4 mb-2">
          <div>
            <Text className="font-medium text-lg text-gray-900">
              Apartment in Southbank
            </Text>
            <Text className="text-sm text-gray-500">
              Sky High at Southbank: Sprawling Views
            </Text>
          </div>
          <div className="flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-4 h-4 text-yellow-400"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <Text className="font-medium text-sm">
              4.66
            </Text>
            <Text className="text-sm text-gray-500">
              (145)
            </Text>
          </div>
        </div>
  
        <Badge color="green" variant="light" className="mb-4">
          Free cancellation
        </Badge>
  
        <div className="flex justify-between mt-4">
          <div>
            <Text className="text-xl font-bold text-gray-900 line-through">
              ¥19,014
            </Text>
            <Text className="text-xl font-bold text-gray-900">
              ¥17,278
            </Text>
            <Text className="text-sm text-gray-500">
              per night
            </Text>
          </div>
          <Text className="text-sm text-gray-500 text-right line-through">
            ¥135,546 total
          </Text>
        </div>
      </Card>
    )
  }