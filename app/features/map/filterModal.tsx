"use client"

import { useState } from "react"
import { Modal, SegmentedControl, RangeSlider, Badge } from "@mantine/core"
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FilterSearch } from "@/app/types";

interface FilterModalProps {
  onClose: () => void
  onApply: (filters: FilterSearch) => void
  isOpen: boolean
}

export default function FilterModal({ onClose, onApply, isOpen }: FilterModalProps) {
    const [filters, setFilters] = useState<FilterSearch>({
      type: "WORKPLACE", // 初期値
      wageRange: [20, 200],
      rentRange: [100, 1000],  
      rating: 0,
    })
  
    // フィルターをonApplyに渡す
    const handleApply = () => {
      onApply(filters)
    }
  
    const handleClear = () => {
      setFilters({
        type: "WORKPLACE",
        wageRange: [20, 200],
        rentRange: [100, 1000],       
        rating: 0,
      })
    }
  
    return (
        <Modal
            opened={isOpen}
            onClose={onClose}
            title="Filters"
            centered
            styles={{
                body: { overflowY: 'auto', maxHeight: '80vh' } // スクロールを有効にし、高さを制限
            }}
        >
        <div className="p-4 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <button onClick={onClose} className="p-2">
              <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
            </button>
            <h1 className="text-2xl font-semibold">Filters</h1>
            <div className="w-10" />
          </div>
  
          {/* タイプ  */}
        <div className="space-y-4">
            <h2 className="text-xl">タイプ</h2>
            <SegmentedControl
                fullWidth
                value={filters.type} 
                onChange={(value: string) => setFilters((prev) => ({ ...prev, type: value }))}
                data={[
                { label: "Workplace", value: "WORKPLACE" },
                { label: "Accommodation", value: "ACCOMMODATION" },
                ]}
                classNames={{
                    root: "bg-gray-100",
                    control: "p-2",
                    label: "text-base",
                }}
            />
        </div>

        {/* おすすめ度 */}
        <div className="space-y-4">
            <h2 className="text-xl">おすすめ度</h2>
            <SegmentedControl
                fullWidth
                value={filters.rating !== undefined ? filters.rating.toFixed(1) : "0"}
                onChange={(value: string) => setFilters((prev) => ({ ...prev, rating: parseFloat(value) }))}
                data={[
                    { label: "Any", value: "0" },
                    { label: "3.5 ★", value: "3.5" },
                    { label: "4.0 ★", value: "4.0" },
                    { label: "4.5 ★", value: "4.5" },
                    { label: "5.0 ★", value: "5.0" },
                ]}
                classNames={{
                    root: "bg-gray-100",
                    control: "p-2",
                    label: "text-base",
                }}
            />
        </div>
  
        {/* 時給 */}
        {filters.type === "WORKPLACE" && filters.wageRange && (
            <div className="space-y-4">
                <h2 className="text-xl">時給</h2>
                <div className="px-2">
                <RangeSlider
                    min={20}
                    max={200}
                    value={filters.wageRange}
                    onChange={(value) => setFilters((prev) => ({ ...prev, wageRange: value }))}
                    classNames={{
                    thumb: "bg-[#008299] border-0",
                    track: "bg-[#008299]",
                    }}
                />
                <div className="flex justify-between mt-2">
                    <Badge
                        size="lg"
                        color="blue"
                        >
                        Min: A${filters.wageRange[0]}
                    </Badge>
                    <Badge
                        size="lg"
                        color="blue"
                        >
                        Max: A${filters.wageRange[1]}
                    </Badge>
                </div>
                </div>
            </div>
        )}

        {/* 家賃 */}
        {filters.type === "ACCOMMODATION" && filters.rentRange && (
            <div className="space-y-4">
                <h2 className="text-xl">家賃</h2>
                <div className="px-2">
                <RangeSlider
                    min={100}
                    max={1000}
                    value={filters.rentRange}
                    onChange={(value) => setFilters((prev) => ({ ...prev, rentRange: value }))}
                    classNames={{
                    thumb: "bg-[#008299] border-0",
                    track: "bg-[#008299]",
                    }}
                />
                <div className="flex justify-between mt-2">
                    <Badge
                        size="lg"
                        color="blue"
                        >
                        Min: A${filters.rentRange[0]}
                    </Badge>
                    <Badge
                        size="lg"
                        color="blue"
                        >
                        Max: A${filters.rentRange[1]}
                    </Badge>
                </div>
                </div>
            </div>
        )}
  
        {/* Bottom Buttons */}
        <div className=" bottom-0 left-0 right-0 p-4 flex border-t bg-white">
            <button onClick={handleClear} className="flex-1 p-4 text-gray-600 text-lg">
                Clear
            </button>
            <button onClick={handleApply} className="flex-1 p-4 text-[#008299] font-medium text-lg">
                Apply
            </button>
        </div>
        </div>
      </Modal>
    )
  }
