import { Request, Response, NextFunction } from 'express'
import { generate as generateMemoRequest, watch as watchMemoResult } from '../services/memo.service'
import { GenerateMemoResponse, WatchMemoResponse } from '../types/content.type'

export async function generate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const generateMemoResponse: GenerateMemoResponse = await generateMemoRequest()

        res.status(201).json({
            success: true,
            data: generateMemoResponse
        })
    } catch (error) {
        console.error('[memo][controller][generate] Error:', error)
        next(error)
    }
}

export async function watch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { studentClassicAddress, solutionClassicAddress } = req.body

        if (!studentClassicAddress || !solutionClassicAddress) {
            res.status(400).json({
                success: false,
                error: 'Missing or invalid params in request body'
            })
        }

        const watchMemoResponse: WatchMemoResponse = await watchMemoResult(studentClassicAddress, solutionClassicAddress);

        res.status(201).json({
            success: true,
            data: watchMemoResponse
        })
    } catch (error) {
        console.error('[memo][controller][watch] Error:', error)
        next(error)
    }
}